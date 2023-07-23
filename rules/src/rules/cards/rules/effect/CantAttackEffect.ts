import { Effect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'

class CantAttackEffect extends AttackEffect {

  constructor(game: MaterialGame) {
    super(game)
  }

  canAttack(): boolean {
    return false
  }
}

export const cantAttack = (filters: ApplicableFilter[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new CantAttackEffect(game)
  }

}
