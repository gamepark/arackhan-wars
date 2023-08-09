import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType } from '../../descriptions/base/Effect'

export type CardValues = { attack?: number, defense?: number }

export const valueModifier = (filters: ApplicableFilter[], values: CardValues): Ability => {
  const ability = new Ability()
  if (values.attack) ability.effects.push({ type: EffectType.Attack, value: values.attack })
  if (values.defense) ability.effects.push({ type: EffectType.Defense, value: values.defense })
  return ability.to(...filters)
}
