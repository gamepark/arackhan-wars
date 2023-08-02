import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { Deactivated, EffectType } from '../../descriptions/base/Effect'

export const deactivate = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: Deactivated = { type: EffectType.Deactivated }

  getEffectRule(game: MaterialGame) {
    return new EffectRule(game) // TODO: remove or make optional
  }

}
