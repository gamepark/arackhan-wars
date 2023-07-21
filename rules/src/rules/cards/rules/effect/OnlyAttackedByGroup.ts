import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Effect, PassiveEffect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'

export class OnlyAttackedByGroup extends AttackEffect {
  isValidAttack(_attackers: number[]): boolean {
    return _attackers.length > 1
  }
}

export const onlyAttackedByGroup = new class extends Effect {

  getEffectRule(game: MaterialGame): PassiveEffect {
    return new OnlyAttackedByGroup(game)
  }
}
