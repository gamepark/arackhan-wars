import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { Deactivated, EffectType } from '../../descriptions/base/Effect'

export const deactivate = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: Deactivated = { type: EffectType.Deactivated }
}
