import { Ability } from '../../descriptions/base/Ability'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, LoseAttributes } from '../../descriptions/base/Effect'

export const looseAttributes = (filters: ApplicableFilter[], attributes?: CardAttributeType[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: LoseAttributes = { type: EffectType.LoseAttributes, attributes }
}

