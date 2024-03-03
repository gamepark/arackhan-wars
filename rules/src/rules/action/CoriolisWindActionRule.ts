import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class CoriolisWindActionRule extends MoveCardsActionRule {
  moves = 1
  maxDistance = 3

  getCardsAllowedToMove(): Material {
    const coriolisWind = this.cardRule
    return coriolisWind.getOtherCardsAdjacentTo()
      .player(player => player !== this.player)
      .filter((_, index) => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && !cardRule.isImmuneToEnemySpells
      })
  }
}
