import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'

export class CantBeAttackedByGroup extends AttackEffect {

  canBeAttacked(_attacker: number, _opponent: number, otherAttackers: number[] = []): boolean {
    return otherAttackers.length === 0
  }
}

export const onlyNotGroupedAttack = new class extends Ability {


  getEffectRule(game: MaterialGame): EffectRule {
    return new CantBeAttackedByGroup(game)
  }
}
