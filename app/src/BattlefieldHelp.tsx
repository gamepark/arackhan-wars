/** @jsxImportSource @emotion/react */

import { useDndMonitor } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { AttributeType } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { EffectType } from '@gamepark/arackhan-wars/material/cards/Effect'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Attack } from '@gamepark/arackhan-wars/rules/AttackRule'
import { CardRule, getCardRule, Path } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { MaterialContext, useMaterialContext, useRules } from '@gamepark/react-game'
import { Location, MaterialGame, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { RefObject, useEffect, useRef, useState } from 'react'
import initiativeCancel from './images/icons/attributes/initiative-cancel.png'
import movementCancel from './images/icons/attributes/movement-cancel.png'
import { attributesIconDescription } from './locators/AttributesIconsLocator'
import { battleFieldLocator } from './locators/BattlefieldLocator'
import { platMatSize } from './material/BattleMatDescription'

export function BattlefieldHelp() {
  return <>
    <AttacksHelp/>
    <MovementHelp/>
  </>
}

function AttacksHelp() {
  const rules = useRules<ArackhanWarsRules>()
  const attacks = rules?.remind<Attack[]>(Memory.Attacks)
  const ref = useRef<HTMLCanvasElement>(null)
  const context = useMaterialContext()

  useEffect(() => {
    const ctx = getCanvasContext(ref)
    if (!ctx || !rules || !attacks?.length) return
    for (const attack of attacks) {
      const attacker = rules.material(MaterialType.FactionCard).getItem(attack.card)!
      for (const target of attack.targets) {
        const defender = rules.material(MaterialType.FactionCard).getItem(target)!
        drawArrow(ctx, attacker.location, defender.location, context)
      }
    }
  }, [rules, attacks])

  if (!attacks?.length) return null
  return <canvas ref={ref} css={canvasCss} width={100 * scale} height={100 * scale}/>
}

type MovementBlock = { card?: MaterialItem, location: Location }

function MovementHelp() {
  const rules = useRules<ArackhanWarsRules>()
  const context = useMaterialContext()
  const [movementBlocks, setMovementBlocks] = useState<MovementBlock[]>([])
  const ref = useRef<HTMLCanvasElement>(null)
  useDndMonitor({
    onDragStart(event) {
      if (event.active.data.current?.type !== MaterialType.FactionCard) return
      const cardIndex = event.active.data.current.index
      const cardRules = getCardRule(rules!.game, cardIndex)
      if (cardRules.item.location.type !== LocationType.Battlefield || cardRules.canFly) return
      const paths = cardRules.buildMovementPaths()
      const movementBlocks: MovementBlock[] = []
      for (let y = 0; y < paths.length; y++) {
        for (let x = 0; x < paths[y].length; x++) {
          if (paths[y][x] === Path.CanStop || paths[y][x] === Path.CanGoThrough) {
            const gameCopy: MaterialGame = JSON.parse(JSON.stringify(rules!.game))
            const cardCopy = new ArackhanWarsRules(gameCopy).material(MaterialType.FactionCard).index(cardIndex)
            cardCopy.getItem()!.location.x = x
            cardCopy.getItem()!.location.y = y
            const cardRulesCopy = new CardRule(gameCopy, cardRules.index)
            if (rules?.remind(Memory.IsInitiativeSequence) && !cardRulesCopy.hasInitiative) {
              movementBlocks.push({ location: { type: LocationType.Battlefield, x, y } })
            } else if (!cardRulesCopy.isActive || !cardRulesCopy.attributes.some(attribute => attribute.type === AttributeType.Movement)) {
              for (const rule of cardRulesCopy.cardsThatMightAffect) {
                if (!cardRulesCopy.isImmuneTo(rule) && rule.index !== cardIndex && rule.abilities.some(ability =>
                    ability.isApplicable(gameCopy, rule.cardMaterial, cardCopy)
                    && ability.effects.some(effect =>
                      effect.type === EffectType.Deactivated
                      || (effect.type === EffectType.LoseAttributes && (!effect.attributes || effect.attributes.includes(AttributeType.Movement)))
                    )
                )) {
                  movementBlocks.push({ card: rule.item, location: { type: LocationType.Battlefield, x, y } })
                }
              }
            }
          }
        }
      }
      setMovementBlocks(movementBlocks)
    },
    onDragEnd() {
      setMovementBlocks([])
    }
  })
  useEffect(() => {
    const ctx = getCanvasContext(ref)
    if (!ctx || !ref.current || !movementBlocks.length) return
    for (const movementBlock of movementBlocks) {
      if (movementBlock.card && movementBlock.card.location.type !== LocationType.AstralPlane) {
        drawArrow(ctx, movementBlock.card.location, movementBlock.location, context)
      }
    }
  }, [rules, movementBlocks])

  if (!movementBlocks.length) return null
  return <>
    <canvas ref={ref} css={canvasCss} width={100 * scale} height={100 * scale}/>
    {movementBlocks.map(({ card, location }) =>
      <div key={`${location.x}_${location.y}`}
           css={movementCancelIcon(battleFieldLocator.getPositionOnParent(location, context), card !== undefined ? movementCancel : initiativeCancel)}/>
    )}
  </>
}

const getCanvasContext = (ref: RefObject<HTMLCanvasElement>) => {
  if (!ref.current) return
  const ctx = ref.current.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, 100 * scale, 100 * scale)
  ctx.lineWidth = scale
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'rgba(139, 0, 0, 0.5)'
  return ctx
}

const drawArrow = (ctx: CanvasRenderingContext2D, from: Location, to: Location, context: MaterialContext) => {
  const a = battleFieldLocator.getPositionOnParent(from, context)
  a.y -= 2
  const b = battleFieldLocator.getPositionOnParent(to, context)
  b.y -= 2
  const start = getCoordinatesOnLineAtDistance(a, b, 3)
  const end = getCoordinatesOnLineAtDistance(b, a, 3)
  const arrow = getArrowCoordinates(start, end, 2)
  ctx.beginPath()
  ctx.moveTo(start.x * scale, start.y * scale)
  ctx.lineTo(end.x * scale, end.y * scale)
  ctx.moveTo(arrow[0].x * scale, arrow[0].y * scale)
  ctx.lineTo(end.x * scale, end.y * scale)
  ctx.moveTo(arrow[1].x * scale, arrow[1].y * scale)
  ctx.lineTo(end.x * scale, end.y * scale)
  ctx.stroke()
}

const getCoordinatesOnLineAtDistance = (a: XYCoordinates, b: XYCoordinates, d: number): XYCoordinates => {
  const baseDistance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  return { x: a.x - d * (a.x - b.x) / baseDistance, y: a.y - d * (a.y - b.y) / baseDistance }
}

const getArrowCoordinates = (a: XYCoordinates, b: XYCoordinates, d: number): [XYCoordinates, XYCoordinates] => {
  const baseAngle = Math.atan2(a.y - b.y, a.x - b.x)
  const tip1Angle = baseAngle + 45 * Math.PI / 180
  const tip2Angle = baseAngle - 45 * Math.PI / 180
  return [
    { x: b.x + Math.cos(tip1Angle) * d, y: b.y + Math.sin(tip1Angle) * d },
    { x: b.x + Math.cos(tip2Angle) * d, y: b.y + Math.sin(tip2Angle) * d }
  ]
}

const scale = 100

const canvasCss = css`
  position: absolute;
  left: ${29}em;
  top: ${29}em;
  width: ${platMatSize}em;
  height: ${platMatSize}em;
  transform: translate(-50%, -50%) translateZ(20em);
  pointer-events: none;
`

const movementCancelIcon = ({ x, y }: XYCoordinates, icon: string) => css`
  position: absolute;
  left: ${29}em;
  top: ${29}em;
  width: ${attributesIconDescription.ratio * 2.5}em;
  height: ${2.5}em;
  background-image: url(${icon});
  background-size: cover;
  transform: translate(-50%, -50%) translate3d(${(x - 50) * platMatSize / 100}em, ${(y - 52) * platMatSize / 100}em, 20em);
  filter: drop-shadow(0 0 0.1em black) drop-shadow(0 0 0.1em black) drop-shadow(0 0 0.1em black);
`
