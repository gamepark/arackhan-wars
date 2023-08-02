import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Effect, EffectRule } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'

export class CantBeAttackedByGroup extends AttackEffect {

  canBeAttacked(_attacker: number, _opponent: number, otherAttackers: number[] = []): boolean {
    return otherAttackers.length === 0
  }
}

export const onlyNotGroupedAttack = new class extends Effect {


  getEffectRule(game: MaterialGame): EffectRule {
    return new CantBeAttackedByGroup(game)
  }
}
