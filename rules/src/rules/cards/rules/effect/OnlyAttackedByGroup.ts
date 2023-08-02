import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'

export class OnlyAttackedByGroup extends AttackEffect {
  isValidAttack(_attackers: number[]): boolean {
    return _attackers.length > 1
  }
}

export const onlyAttackedByGroup = new class extends Ability {

  getEffectRule(game: MaterialGame): EffectRule {
    return new OnlyAttackedByGroup(game)
  }
}
