/** @jsxImportSource @emotion/react */

import { useRules } from '@gamepark/react-game'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { Attack } from '@gamepark/arackhan-wars/rules/AttackRule'
import { useEffect, useRef } from 'react'
import { platMatSize } from './material/PlayMatDescription'
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { battleFieldLocator } from './locators/BattlefieldLocator'
import { XYCoordinates } from '../../../workshop/packages/rules-api'

export default function AttacksDisplay() {
  const rules = useRules<ArackhanWarsRules>()
  const attacks = rules?.remind<Attack[]>(Memory.Attacks)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current || !rules || !attacks?.length) return
    const ctx = ref.current.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, 100 * scale, 100 * scale)
    ctx.lineWidth = scale
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'rgba(139, 0, 0, 0.5)'
    for (const attack of attacks) {
      const attacker = rules.material(MaterialType.FactionCard).getItem(attack.card)
      const a = battleFieldLocator.getPositionOnParent(attacker!.location)
      a.y -= 2
      for (const target of attack.targets) {
        const defender = rules.material(MaterialType.FactionCard).getItem(target)
        const b = battleFieldLocator.getPositionOnParent(defender!.location)
        b.y -= 2
        const start = getCoordinatesOnLineAtDistance(a, b, 2)
        const end = getCoordinatesOnLineAtDistance(b, a, 2)
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
    }
  }, [attacks])

  if (!attacks?.length) return null
  return <canvas ref={ref} css={canvasCss} width={100 * scale} height={100 * scale}/>
}

const getCoordinatesOnLineAtDistance = (a: XYCoordinates, b: XYCoordinates, d: number): XYCoordinates => {
  const baseDistance = Math.sqrt(Math.pow((a.x - b.x) + (a.y - b.y), 2))
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
  width: ${platMatSize}em;
  height: ${platMatSize}em;
  transform: translate(-50%, -50%) translateZ(20em);
  pointer-events: none;
`
