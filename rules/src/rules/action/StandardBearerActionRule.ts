import { CustomMove, Direction, directions, getSquareInDirection, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { isInBattlefield } from '../../material/Board'
import { Family } from '../../material/cards/Family'
import { CustomMoveType } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class StandardBearerActionRule extends CardActionRule {

  getPlayerMoves() {
    const direction = this.remind(Memory.Direction)
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    if (direction === undefined) {
      const standardBearer = this.cardRule
      return directions.map(direction => getSquareInDirection(standardBearer.item.location, direction))
        .filter(({ x, y }) => isInBattlefield({ x, y })
          && battlefield.location(l => l.x === x && l.y === y).length === 0
          && standardBearer.thereIsAnotherCardAdjacentTo({ x, y })
        ).map(({ x, y }) => standardBearer.cardMaterial.moveItem({ type: LocationType.Battlefield, x, y, player: this.player }))
    } else {
      const moves: MaterialMove[] = battlefield.player(this.player)
        .index(index => {
            const cardRule = getCardRule(this.game, index)
            const { x, y } = getSquareInDirection(cardRule.item.location, direction)
            return !this.remind<number[]>(Memory.MovedCards).includes(index)
              && cardRule.family === Family.Legion6
              && isInBattlefield({ x, y })
              && battlefield.location(l => l.x === x && l.y === y).length === 0
              && cardRule.thereIsAnotherCardAdjacentTo({ x, y })
          }
        ).moveItems(item => ({ type: LocationType.Battlefield, player: this.player, ...getSquareInDirection(item.location, direction) }))
      moves.push(this.rules().customMove(CustomMoveType.Pass))
      return moves
    }
  }

  beforeItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      if (move.itemIndex === this.remind(Memory.ActionCard)) {
        const { x, y } = move.location
        const origin = this.actionCard.location
        const direction = origin.y! - 1 === y ? Direction.North : origin.y! + 1 === y ? Direction.South : origin.x! - 1 === x ? Direction.East : Direction.West
        this.memorize(Memory.Direction, direction)
        this.memorize(Memory.MovedCards, [move.itemIndex])
      } else {
        this.memorize<number[]>(Memory.MovedCards, cards => [...cards, move.itemIndex])
      }
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
    this.forget(Memory.Direction)
    this.memorize(Memory.MovedCards, [])
    return super.onRuleEnd()
  }
}
