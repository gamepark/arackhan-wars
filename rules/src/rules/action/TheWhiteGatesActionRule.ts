import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class TheWhiteGatesActionRule extends MoveCardsActionRule {
  maxDistance = 2

  getCardsAllowedToMove(): Material {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    const theWhiteGates = this.cardRule
    return theWhiteGates.getOtherCardsAdjacentTo()
      .player(this.player)
      .index(index => !movedCards.includes(index) && getCardRule(this.game, index).isCreature)
  }
}
