import { CustomMove, getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { CustomMoveType } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveRules } from '../MoveRules'
import { CardActionRule } from './CardActionRule'

export class TheWhiteGatesActionRule extends CardActionRule {

  getPlayerMoves() {
    const ancestralLibrary = this.cardRule
    const moves: MaterialMove[] = []
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const indexesCanMove = ancestralLibrary.getOtherCardsAdjacentTo(ancestralLibrary.item.location as XYCoordinates).player(this.player)
      .filter((_, index) => !this.remind<number[]>(Memory.MovedCards).includes(index) && getCardRule(this.game, index).isCreature).getIndexes()
    for (const index of indexesCanMove) {
      const card = getCardRule(this.game, index)
      const legalDestinations = battlefieldCoordinates.filter(coordinates => {
        if (getDistanceBetweenSquares(card.item.location as XYCoordinates, coordinates) > 2) return false
        const swap = battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y)
        if (swap.length && (swap.getIndex() === index || !indexesCanMove.includes(swap.getIndex()))) return false
        return card.thereIsAnotherCardAdjacentTo(coordinates)
      })
      for (const { x, y } of legalDestinations) {
        moves.push(card.cardMaterial.moveItem({ type: LocationType.Battlefield, x, y, player: this.player }))
      }
    }
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      this.memorize<number[]>(Memory.MovedCards, cards => [...cards, move.itemIndex])
      return new MoveRules(this.game).getSwapMoves(move)
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && this.getPlayerMoves().length === 1) {
      return this.afterCardAction()
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.afterCardAction()
    }
    return []
  }

  onRuleEnd() {
    this.memorize(Memory.MovedCards, [])
    return super.onRuleEnd()
  }
}
