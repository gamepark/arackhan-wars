import { Ability } from '../../descriptions/base/Ability'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType } from '../../descriptions/base/Effect'

export const gainAttributes = (filters: ApplicableFilter[], attributes: CardAttributeType[]) => {
  const ability = new Ability()
  ability.effect = { type: EffectType.GainAttributes, attributes }
  return ability.to(...filters)
}
