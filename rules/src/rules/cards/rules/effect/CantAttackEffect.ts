import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { CannotAttack, EffectType } from '../../descriptions/base/Effect'

export const cantAttack = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: CannotAttack = { type: EffectType.CannotAttack }
}
