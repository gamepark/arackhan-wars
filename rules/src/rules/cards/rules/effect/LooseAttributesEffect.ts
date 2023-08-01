import { Effect, PassiveEffect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

export class LooseAttributesEffect extends PassiveEffect {

  constructor(game: MaterialGame, readonly attributes?: CardAttributeType[]) {
    super(game)
  }

  hasLostAttribute(attribute: CardAttributeType) {
    if (!this.attributes) return true
    return this.attributes.includes(attribute)
  }
}

export const looseAttributes = (filters: ApplicableFilter[], attributes?: CardAttributeType[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new LooseAttributesEffect(game, attributes)
  }

}

export const isLooseAttributesEffect = (effect: PassiveEffect): effect is LooseAttributesEffect => typeof (effect as any).hasLostAttribute === 'function'

