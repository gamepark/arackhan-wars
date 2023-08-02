import { Effect, EffectRule } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

export class GainAttributesEffect extends EffectRule {

  constructor(game: MaterialGame, readonly attributes: CardAttributeType[]) {
    super(game)
  }

  hasGainedAttribute(attribute: CardAttributeType) {
    return this.attributes.includes(attribute)
  }
}

export const gainAttributes = (filters: ApplicableFilter[], attributes: CardAttributeType[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new GainAttributesEffect(game, attributes)
  }

}
