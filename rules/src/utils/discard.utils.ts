import { DiscardTiming } from '../rules/cards/descriptions/base/FactionCardDetail'
import { getFactionCardDescription } from '../material/FactionCard'
import { isSpell } from '../rules/cards/descriptions/base/Spell'
import { LocationType } from '../material/LocationType'
import { Material, MaterialMove } from '@gamepark/rules-api'


export const discardSpells = (cards: Material, discardTiming?: DiscardTiming): MaterialMove[] => {
  return cards
    .getIndexes()
    .flatMap((index: number) => {
      const cardMaterial = cards.index(index)
      const card = cardMaterial.getItem()!
      const description = getFactionCardDescription(card.id.front)
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
