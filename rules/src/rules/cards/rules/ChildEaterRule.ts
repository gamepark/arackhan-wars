import { FactionCardRule } from './base/FactionCardRule'
import { ChildEaterAttackRule } from './attack/ChildEaterAttackRule'

export class ChildEaterRule extends FactionCardRule {
  attack() {
    return new ChildEaterAttackRule(this.game, this.item, this.card, this.index, this.battlefieldCards)
  }
}
