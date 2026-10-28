import { describe, expect, it } from 'vitest'
import { PreBuildDecks } from '../material/cards/PreBuildDecks'
import { publisherDecks } from '../material/decks/PublisherDecks'
import { FactionCard } from '../material/FactionCard'
import { DeckValidator } from './DeckValidator'

describe('DeckValidator', () => {
  it('accepts every deck the players can choose', () => {
    for (const deck of [...Object.values(PreBuildDecks), ...publisherDecks]) {
      const validator = new DeckValidator(deck)
      expect(validator.cardsOverLimit).toEqual([])
      expect(validator.isValid).toBe(true)
    }
  })

  it('wants exactly 23 cards', () => {
    const deck = PreBuildDecks[1]
    expect(new DeckValidator(deck.slice(1)).is23Cards).toBe(false)
    expect(new DeckValidator([...deck, deck[0]]).is23Cards).toBe(false)
  })

  it('wants a single faction', () => {
    const deck = [...PreBuildDecks[1].slice(1), PreBuildDecks[2][0]]
    expect(new DeckValidator(deck).isSingleFaction).toBe(false)
    expect(new DeckValidator(deck).isValid).toBe(false)
  })

  it('caps the copies of a card', () => {
    const deck = Array<FactionCard>(23).fill(FactionCard.Blizzard)
    expect(new DeckValidator(deck).cardsOverLimit).toEqual([FactionCard.Blizzard])
    expect(new DeckValidator(deck).isValid).toBe(false)
  })
})
