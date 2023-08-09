import { Ability } from '../../descriptions/base/Ability'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType } from '../../descriptions/base/Effect'

export const looseAttributes = (filters: ApplicableFilter[], attributes?: CardAttributeType[]) => {
  const ability = new Ability()
  ability.effect = { type: EffectType.LoseAttributes, attributes }
  return ability.to(...filters)
}

