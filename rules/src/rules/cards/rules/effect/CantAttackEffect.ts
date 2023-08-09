import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType } from '../../descriptions/base/Effect'

export const cantAttack = (filters: ApplicableFilter[]) => {
  const ability = new Ability()
  ability.effect = { type: EffectType.CannotAttack }
  return ability.to(...filters)
}
