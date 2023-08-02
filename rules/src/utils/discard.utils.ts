import { DiscardTiming } from '../rules/cards/descriptions/base/FactionCardCharacteristics'
import { isSpell } from '../rules/cards/descriptions/base/Spell'
import { LocationType } from '../material/LocationType'
import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { getCardRule } from '../rules/cards/rules/base/CardRule'

export const discardSpells = (game: MaterialGame, cards: Material, discardTiming?: DiscardTiming): MaterialMove[] => {
  return cards
    .getIndexes()
    .flatMap((index: number) => {
      const cardMaterial = cards.index(index)
      const description = getCardRule(game, index).characteristics
      if (isSpell(description) && description.discardTiming === discardTiming) {
        return discardCard(cardMaterial)
      }

      return []
    })
}

export const discardCard = (card: Material, token?: Material): MaterialMove[] => {

  const moves: MaterialMove[] = []

  if (token?.length) {
    moves.push(token.deleteItem())
  }

  moves.push(
    card
      .moveItem({ location: { type: LocationType.PlayerDiscard, player: card.getItem()!.location.player } })
  )

  return moves
}
