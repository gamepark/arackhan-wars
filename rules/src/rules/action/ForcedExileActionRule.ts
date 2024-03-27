import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class ForcedExileActionRule extends MoveCardsActionRule {
  moves = 1

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(player => player !== this.player).index(index => {
      const cardRule = getCardRule(this.game, index)
      return cardRule.isCreature && !cardRule.isImmuneToEnemySpells
    })
  }
}
