import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, LoseSkills } from '../../descriptions/base/Effect'

export const looseSkills = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: LoseSkills = { type: EffectType.LoseSkills }
}
