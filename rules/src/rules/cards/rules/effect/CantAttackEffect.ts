import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { CannotAttack, EffectType } from '../../descriptions/base/Effect'

class CantAttackEffect extends AttackEffect {

  constructor(game: MaterialGame) {
    super(game)
  }

  canAttack(): boolean {
    return false
  }
}

export const cantAttack = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: CannotAttack = { type: EffectType.CannotAttack }

  getEffectRule(game: MaterialGame) {
    return new CantAttackEffect(game)
  }

}
