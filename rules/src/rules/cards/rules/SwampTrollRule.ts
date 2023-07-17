import { FactionCardRule } from './base/FactionCardRule'
import { SwampTrollAttackRule } from './attack/SwampTrollAttackRule'

export class SwampTrollRule extends FactionCardRule {
  attack() {
    return new SwampTrollAttackRule(this.game, this.item, this.card, this.index, this.battlefieldCards)
  }
}
