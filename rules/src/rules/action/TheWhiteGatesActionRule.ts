import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class TheWhiteGatesActionRule extends MoveCardsActionRule {
  maxDistance = 2

  getCardsAllowedToMove(): Material {
    const theWhiteGates = this.cardRule
    return theWhiteGates.getOtherCardsAdjacentTo()
      .player(this.player)
      .filter((_, index) => getCardRule(this.game, index).isCreature)
  }
}
