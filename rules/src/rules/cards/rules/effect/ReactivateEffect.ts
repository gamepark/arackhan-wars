import { Effect, PassiveEffectWithConsequences } from '../../descriptions/base/Effect'
import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { activateTokens } from '../../../../utils/activation.utils'

class ReactivateEffect extends PassiveEffectWithConsequences {

  constructor(game: MaterialGame) {
    super(game)
  }

  onCasterMoveAway(_source: Material, target: Material): MaterialMove[] {
    return activateTokens(this.material(MaterialType.FactionToken).parent(target.getIndex()))
  }
}

export const reactivate = (filters: ApplicableFilter[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new ReactivateEffect(game)
  }

}
