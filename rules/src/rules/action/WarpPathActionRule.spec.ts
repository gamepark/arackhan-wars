import { MaterialGame, MaterialItem } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { FactionCardsCharacteristics } from '../../material/cards/FactionCardsCharacteristics'
import { FactionCard } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

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
  memory: { [Memory.MovedCards]: [], [Memory.OncePerRound]: [] },
  rule: { id: RuleId.ActivationRule, player: 1 }
})

describe('Warp Path', () => {
  const warpPath = card(FactionCard.WarpPath, { type: LocationType.AstralPlane, x: 0, player: 1 })

  it('cannot be used with a single allied creature: it would have nowhere to go', () => {
    const game = gameWith([warpPath, card(FactionCard.NakkaArcher, { type: LocationType.Battlefield, x: 3, y: 2, player: 1 })])
    expect(getCardRule(game, 0).canPerformAction).toBe(false)
  })

  it('swaps two allied creatures', () => {
    const game = gameWith([
      warpPath,
      card(FactionCard.NakkaArcher, { type: LocationType.Battlefield, x: 3, y: 2, player: 1 }),
      card(FactionCard.NakkaArcher, { type: LocationType.Battlefield, x: 3, y: 3, player: 1 })
    ])
    expect(getCardRule(game, 0).canPerformAction).toBe(true)
  })
})
