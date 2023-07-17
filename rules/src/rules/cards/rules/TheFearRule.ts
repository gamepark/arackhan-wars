import { FactionCardRule } from './base/FactionCardRule'
import { MaterialType } from '../../../material/MaterialType'
import { onBattlefieldAndAstralPlane } from '../../../utils/LocationUtils'
import { areAdjacent } from '../../../utils/adjacent.utils'
import { getFactionCardDescription } from '../../../material/FactionCard'
import { FactionCardKind } from '../descriptions/FactionCardDetail'

export class TheFearRule extends FactionCardRule {
  onRoundEnd() {
    return this.discardCard()
  }

  onPlaceCard() {
    const cardItem = this.item.getItem()!
    const adjacentCreatureIndexes = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .filter((card) => areAdjacent(cardItem, card) && getFactionCardDescription(card.id.front).kind === FactionCardKind.Creature)
      .player((player) => player !== cardItem.location.player)
      .getIndexes()

    const moves = []
    for (const index of adjacentCreatureIndexes) {
      const factionToken = this
        .material(MaterialType.FactionToken)
        .parent(index)
        .rotation((rotation) => !rotation?.y)

      if (factionToken.length) {
        moves.push(...factionToken.moveItems({ rotation: { y: 1 } }))
      }
    }

    return moves

  }

  beforeDiscard() {

    // TODO: return faction tokens only for card that was not activated during the round
    // TODO: difference must be made between "activated cards" or "disabled cards"
    return []
  }
}
