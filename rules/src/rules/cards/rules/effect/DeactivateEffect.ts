import { Effect, PassiveEffectWithConsequences } from '../../descriptions/base/Effect'
import { Material, MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { activateTokens } from '../../../../utils/activation.utils'
import { MaterialType } from '../../../../material/MaterialType'

export class DeactivateEffect extends PassiveEffectWithConsequences {

  constructor(game: MaterialGame) {
    super(game)
  }

  onCasterMoveTo(_source: Material, target: Material) {
    return activateTokens(this.material(MaterialType.FactionToken).parent(target.getIndex()))
  }
}

export const deactivate = (filters: ApplicableFilter[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new DeactivateEffect(game)
  }

}
