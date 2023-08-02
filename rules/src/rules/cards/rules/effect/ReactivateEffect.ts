import { Ability, PassiveEffectWithConsequences } from '../../descriptions/base/Ability'
import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { activateTokens } from '../../../../utils/activation.utils'

export class ReactivateEffect extends PassiveEffectWithConsequences {

  constructor(game: MaterialGame) {
    super(game)
  }

  onCasterMoveAway(_source: Material, target: Material): MaterialMove[] {
    return activateTokens(this.material(MaterialType.FactionToken).parent(target.getIndex()))
  }
}

export const reactivate = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new ReactivateEffect(game)
  }

}
