import { Direction, getSquareInDirection, Material, MaterialMove, MoveItem, XYCoordinates } from '@gamepark/rules-api'
import { isInBattlefield } from '../../material/Board'
import { Family } from '../../material/cards/Family'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class StandardBearerActionRule extends MoveCardsActionRule {
  maxDistance = 1

  getCardsAllowedToMove(): Material {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length === 0) {
      return this.material(MaterialType.FactionCard).index(this.cardIndex)
    } else {
      return this.battlefield.player(this.player)
        .filter((_, index) => !movedCards.includes(index) && getCardRule(this.game, index).families.includes(Family.Legion6))
    }
  }

  getLegalDestinations(card: Material): XYCoordinates[] {
    const direction = this.remind(Memory.Direction)
    if (direction) {
      const coordinates = getSquareInDirection(card.getItem()!.location, direction)
      return isInBattlefield(coordinates)
      && this.battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y).length === 0
      && getCardRule(this.game, card.getIndex()).thereIsAnotherCardAdjacentTo(coordinates) ? [coordinates] : []
    } else {
      return super.getLegalDestinations(card)
    }
  }

  beforeCardMove(move: MoveItem): MaterialMove[] {
    if (this.remind(Memory.Direction) === undefined) {
      const { x, y } = move.location
      const origin = this.actionCard.location
      const direction = origin.y! - 1 === y ? Direction.North : origin.y! + 1 === y ? Direction.South : origin.x! - 1 === x ? Direction.East : Direction.West
      this.memorize(Memory.Direction, direction)
    }
    return super.beforeCardMove(move)
  }

  onRuleEnd() {
    this.forget(Memory.Direction)
    return super.onRuleEnd()
  }
}
