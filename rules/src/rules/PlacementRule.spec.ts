import { isMoveItemType, MaterialGame, MaterialItem } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { ArackhanWarsRules } from '../ArackhanWarsRules'
import { FactionCardsCharacteristics } from '../material/cards/FactionCardsCharacteristics'
import { FactionCard } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

const card = (front: FactionCard, location: MaterialItem['location']): MaterialItem => ({
  id: { front, back: FactionCardsCharacteristics[front].faction },
  location
})

const placement = (cards: MaterialItem[]): ArackhanWarsRules => new ArackhanWarsRules({
  players: [1, 2],
  items: {
    [MaterialType.FactionCard]: cards,
    [MaterialType.RoundTrackerToken]: [{ location: { type: LocationType.RoundTracker, x: 1 } }]
  },
  memory: { [Memory.StartPlayer]: 1 },
  rule: { id: RuleId.PlacementRule, player: 1 }
} as MaterialGame)

const astralDestinations = (rules: ArackhanWarsRules) => rules.getLegalMoves(1)
  .filter(isMoveItemType(MaterialType.FactionCard))
  .filter(move => move.location.type === LocationType.AstralPlane)
  .map(move => move.location.x)

describe('The placement of an astral spell', () => {
  it('may go to either space of the astral plane', () => {
    const rules = placement([card(FactionCard.Blizzard, { type: LocationType.PlayerHand, player: 1, x: 0 })])
    expect(new Set(astralDestinations(rules))).toEqual(new Set([0, 1]))
  })

  it('only goes to a free space of the astral plane', () => {
    const rules = placement([
      card(FactionCard.Blizzard, { type: LocationType.AstralPlane, x: 0, rotation: true, player: 1 }),
      card(FactionCard.Blizzard, { type: LocationType.PlayerHand, player: 1, x: 0 })
    ])
    expect(astralDestinations(rules)).toEqual([1])
  })
})
