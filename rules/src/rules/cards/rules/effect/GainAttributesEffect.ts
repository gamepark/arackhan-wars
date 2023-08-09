import { Ability } from '../../descriptions/base/Ability'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, GainAttributes } from '../../descriptions/base/Effect'

export const gainAttributes = (filters: ApplicableFilter[], attributes: CardAttributeType[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: GainAttributes = { type: EffectType.GainAttributes, attributes }
}
