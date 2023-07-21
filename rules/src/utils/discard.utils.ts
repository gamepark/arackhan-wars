import { DiscardTiming } from '../rules/cards/descriptions/base/FactionCardDetail'
import { getFactionCardDescription } from '../material/FactionCard'
import { isSpell } from '../rules/cards/descriptions/base/Spell'
import { LocationType } from '../material/LocationType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'


export const discardCards = (cards: Material, tokens: Material, discardTiming?: DiscardTiming): MaterialMove[] => {
  return cards
    .getIndexes()
    .flatMap((index: number) => {
      const card = cards.index(index)!
      const item = card.getItem(index)!
      const description = getFactionCardDescription(item.id.front)
      if (isSpell(description) && description.discardTiming === discardTiming) {
        return discardCard(card, tokens.parent(card.getIndex()))
      }

      return []
    })
}

export const discardCard = (card: Material, token: Material): MaterialMove[] => {

  const moves: MaterialMove[] = []

  if (token.getItem()) {
    moves.push(token.deleteItem())
  }

  moves.push(
    card
      .moveItem({ location: { type: LocationType.PlayerDiscard, player: card.getItem()!.location.player } })
  )

  return moves
}
