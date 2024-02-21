import { CustomMove, isMoveItem, ItemMove, MaterialMove, MoveItem, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Attack } from './AttackRule'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'

export class MoveRules extends PlayerTurnRule {
  getPlayerMoves() {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    const moves: MaterialMove[] = this.material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .player(this.player)
      .getIndexes()
      .filter(index => !movedCards.includes(index) && !attacks.some(attack => attack.card === index))
      .flatMap(index => getCardRule(this.game, index).legalMovements)
    if (movedCards.length) {
      for (const movedCard of movedCards) {
        moves.push(this.material(MaterialType.FactionToken).parent(movedCard).rotateItem(true))
      }
      if (movedCards.length > 1) {
        moves.push(this.rules().customMove(CustomMoveType.Deactivate))
      }
    }
    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItem(move)) {
      if (move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
        return this.onMoveCardOnBattlefield(move)
      }
      if (move.itemType === MaterialType.FactionToken) {
        this.onFlipFactionToken(move)
      }
    }
    return []
  }

  onMoveCardOnBattlefield(move: MoveItem) {
    const moves: MaterialMove[] = this.getSwapMoves(move)
    const cardRule = getCardRule(this.game, move.itemIndex)
    if (cardRule.canAttackAfterMovement(move.location as XYCoordinates)) {
      this.memorize<number[]>(Memory.MovedCards, movedCards => [...movedCards, move.itemIndex])
    } else {
      moves.push(this.material(MaterialType.FactionToken).parent(move.itemIndex).rotateItem(true))
    }
    return moves
  }

  getSwapMoves(move: MoveItem): MaterialMove[] {
    const moves: MaterialMove[] = []
    const cardToSwap = this.material(MaterialType.FactionCard)
      .location(location => location.type === LocationType.Battlefield && location.x === move.location.x && location.y === move.location.y)
    if (cardToSwap.length) {
      const swapLocation = this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.location
      moves.push(cardToSwap.moveItem({ ...swapLocation }))
    }
    return moves
  }

  onFlipFactionToken(move: MoveItem) {
    const token = this.material(MaterialType.FactionToken).getItem(move.itemIndex)
    this.memorize<number[]>(Memory.MovedCards, movedCards => movedCards.filter(card => card !== token?.location.parent))
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Deactivate) {
      const movedCards = this.remind<number[]>(Memory.MovedCards)
      return movedCards.map(movedCard => this.material(MaterialType.FactionToken).parent(movedCard).rotateItem(true))
    }
    return []
  }
}
