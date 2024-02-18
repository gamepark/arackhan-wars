import { CustomMove, getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { Family } from '../../material/cards/Family'
import { CustomMoveType } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class MarchingOrderActionRule extends CardActionRule {

  getPlayerMoves() {
    const moveCards = this.remind<number[]>(Memory.MovedCards)
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const creatures = battlefield.player(this.player).filter((_, index) =>
      !moveCards.includes(index) && getCardRule(this.game, index).family === Family.Legion6
    )
    const moves: MaterialMove[] = battlefieldCoordinates
      .filter(({ x, y }) => !battlefield.location(l => l.x === x && l.y === y).length)
      .flatMap(coordinates =>
        creatures.filter((item, index) =>
          getCardRule(this.game, index).thereIsAnotherCardAdjacentTo(coordinates)
          && getDistanceBetweenSquares(coordinates, item.location as XYCoordinates) <= 2
        ).moveItems({ type: LocationType.Battlefield, ...coordinates, player: this.player })
      )
    if (moveCards.length) {
      moves.push(this.rules().customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      this.memorize<number[]>(Memory.MovedCards, cards => [...cards, move.itemIndex])
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
