import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class AncestralLibraryActionRule extends CardActionRule {
  onRuleStart() {
    const deck = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(this.player).deck()
    const count = Math.min(4, deck.length)
    this.memorize(Memory.Count, count)
    return deck.deal({ type: LocationType.PlayerHand, player: this.player }, count)
  }

  getPlayerMoves() {
    const cardsInHand = this.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(this.player)
    return cardsInHand.moveItems({ type: LocationType.PlayerDeck, player: this.player })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerDeck) {
      this.memorize<number>(Memory.Count, count => count - 1)
      if (this.remind(Memory.Count) === 0) {
        this.forget(Memory.Count)
        return [
          this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(this.player).shuffle(),
          ...this.afterCardAction()
        ]
      }
    }
    return []
  }
}
