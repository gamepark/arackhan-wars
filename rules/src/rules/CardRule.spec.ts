import { MaterialGame, MaterialItem } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { AttributeType } from '../material/cards/Attribute'
import { FactionCardsCharacteristics } from '../material/cards/FactionCardsCharacteristics'
import { FactionCard } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './CardRule'
import { RuleId } from './RuleId'

const card = (front: FactionCard, location: MaterialItem['location']): MaterialItem => ({
  id: { front, back: FactionCardsCharacteristics[front].faction },
  location
})

const gameWith = (cards: MaterialItem[]): MaterialGame => ({
  players: [1, 2],
  items: {
    [MaterialType.FactionCard]: cards,
    [MaterialType.RoundTrackerToken]: [{ location: { type: LocationType.RoundTracker, x: 1 } }]
  },
  memory: {},
  rule: { id: RuleId.ActivationRule, player: 1 }
})

describe('Ghost Metal Monolith', () => {
  // The Monolith in 3,2. The Archer in 3,3 and the Armorer in 4,2 are adjacent to it, their copies in 0,0 and 0,5 are not.
  // A Blizzard of the enemy in the astral plane strips the enemy creatures of their attributes and skills.
  const game = gameWith([
    card(FactionCard.GhostMetalMonolith, { type: LocationType.Battlefield, x: 3, y: 2, player: 1 }),
    card(FactionCard.Archer, { type: LocationType.Battlefield, x: 3, y: 3, player: 1 }),
    card(FactionCard.Armorer, { type: LocationType.Battlefield, x: 4, y: 2, player: 1 }),
    card(FactionCard.Archer, { type: LocationType.Battlefield, x: 0, y: 0, player: 1 }),
    card(FactionCard.Armorer, { type: LocationType.Battlefield, x: 0, y: 5, player: 1 }),
    card(FactionCard.Blizzard, { type: LocationType.AstralPlane, x: 0, player: 2 })
  ])
  const hasRangedAttack = (index: number) => getCardRule(game, index).attributes.some(attribute => attribute.type === AttributeType.RangedAttack)

  it('keeps the attributes of the adjacent allied creatures out of reach of an enemy spell', () => {
    expect(hasRangedAttack(1)).toBe(true)
    expect(hasRangedAttack(3)).toBe(false)
  })

  it('keeps the skills of the adjacent allied creatures out of reach of an enemy spell', () => {
    expect(getCardRule(game, 2).abilities).not.toHaveLength(0)
    expect(getCardRule(game, 4).abilities).toHaveLength(0)
  })
})
