import { Material } from '@gamepark/rules-api'
import { Family } from '../../material/cards/Family'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class MarchingOrderActionRule extends MoveCardsActionRule {
  maxDistance = 2

  getCardsAllowedToMove(): Material {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    return this.battlefield.player(this.player).index(index =>
      !movedCards.includes(index) && getCardRule(this.game, index).families.includes(Family.Legion6)
    )
  }
}
