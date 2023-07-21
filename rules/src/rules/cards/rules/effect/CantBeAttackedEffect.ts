import { Effect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'

class CantBeAttackedEffect extends AttackEffect {

  constructor(game: MaterialGame) {
    super(game)
  }

  canBeAttacked(): boolean {
    return false
  }
}

export const cantBeAttacked = (filters: ApplicableFilter[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new CantBeAttackedEffect(game)
  }

}
