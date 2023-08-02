import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'

export class CantBeAttackedEffect extends AttackEffect {

  constructor(game: MaterialGame) {
    super(game)
  }

  canBeAttacked(): boolean {
    return false
  }
}

export const cantBeAttacked = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new CantBeAttackedEffect(game)
  }

}
