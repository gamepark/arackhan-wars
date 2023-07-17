import { FactionCardRule } from './base/FactionCardRule'
import { DrunkKnightAttackRule } from './attack/DrunkKnightAttackRule'

export class DrunkKnightRule extends FactionCardRule {

  attack() {
    return new DrunkKnightAttackRule(this.game, this.item, this.card, this.index, this.battlefieldCards)
  }
}
