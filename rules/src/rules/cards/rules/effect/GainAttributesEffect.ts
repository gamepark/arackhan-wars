import { Effect, PassiveEffect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

// TODO: Typeguard
class GainAttributesEffect extends PassiveEffect {

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
