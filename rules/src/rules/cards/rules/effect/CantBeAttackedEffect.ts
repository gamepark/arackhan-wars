import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const cantBeAttacked = (filters: ApplicableFilter[]) => {
  const ability = new Ability()
  ability.effect = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoCreature }
  return ability.to(...filters)
}
