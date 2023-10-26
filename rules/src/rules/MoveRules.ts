import { isMoveItem, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Attack } from './AttackRule'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'

export class MoveRules extends PlayerTurnRule {
  getPlayerMoves() {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length) {
      return [this.material(MaterialType.FactionToken).parent(movedCards[0]).rotateItem(true)]
    }
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    return this.material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .player(this.player)
      .getIndexes()
      .filter(index => !attacks.some(attack => attack.card === index))
      .flatMap(index => getCardRule(this.game, index).legalMovements)
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItem(move)) {
      if (move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
        this.memorize(Memory.MovedCards, movedCards => [...movedCards, move.itemIndex])
        const cardToSwap = this.material(MaterialType.FactionCard)
          .location(location => location.type === LocationType.Battlefield && location.x === move.location.x && location.y === move.location.y)
        if (cardToSwap.length) {
          const swapLocation = this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.location
          return [cardToSwap.moveItem({ ...swapLocation })]
        }
      }
      if (move.itemType === MaterialType.FactionToken) {
        const token = this.material(MaterialType.FactionToken).getItem(move.itemIndex)
        this.memorize<number[]>(Memory.MovedCards, movedCards => movedCards.filter(card => card !== token?.location.parent))
      }
    }
    return []
  }
}
