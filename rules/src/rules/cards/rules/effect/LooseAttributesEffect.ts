import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, LoseAttributes } from '../../descriptions/base/Effect'

export class LooseAttributesEffect extends EffectRule {

  constructor(game: MaterialGame, readonly attributes?: CardAttributeType[]) {
    super(game)
  }

  hasLostAttribute(attribute: CardAttributeType) {
    if (!this.attributes) return true
    return this.attributes.includes(attribute)
  }
}

export const looseAttributes = (filters: ApplicableFilter[], attributes?: CardAttributeType[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: LoseAttributes = { type: EffectType.LoseAttributes, attributes }

  getEffectRule(game: MaterialGame) {
    return new LooseAttributesEffect(game, attributes)
  }

}

export const isLooseAttributesEffect = (effect: EffectRule): effect is LooseAttributesEffect => typeof (effect as any).hasLostAttribute === 'function'

