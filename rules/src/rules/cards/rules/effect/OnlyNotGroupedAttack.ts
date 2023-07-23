import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Effect, PassiveEffect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'

export class CantBeAttackedByGroup extends AttackEffect {

  canBeAttacked(_attacker: number, _opponent: number, otherAttackers: number[] = []): boolean {
    return otherAttackers.length === 0
  }
}

export const onlyNotGroupedAttack = new class extends Effect {


  getEffectRule(game: MaterialGame): PassiveEffect {
    return new CantBeAttackedByGroup(game)
  }
}
