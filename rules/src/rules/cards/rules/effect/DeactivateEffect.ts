import { Effect, PassiveEffectWithConsequences } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { deactivateTokens } from '../../../../utils/activation.utils'

class DeactivateEffect extends PassiveEffectWithConsequences {

  constructor(game: MaterialGame) {
    super(game)
  }

  onReveal(_source: Material, target: Material) {
    return this.deactivateCreature(target)
  }

  afterMoveTarget(_source: Material, target: Material) {
    return this.deactivateCreature(target)
  }

  deactivateCreature(target: Material) {
    return deactivateTokens(this.material(MaterialType.FactionToken).parent(target.getIndex()))
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
