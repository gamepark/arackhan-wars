import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class IceWingsActionRule extends MoveCardsActionRule {
  moves = 2

  getCardsAllowedToMove(): Material {
    const alreadyMoved = this.remind<number[]>(Memory.MovedCards)
    return this.battlefield.player(this.player).index(index => {
      const rule = getCardRule(this.game, index)
      return rule.isCreature && rule.value <= 5 && !alreadyMoved.includes(index)
    })
  }
}
