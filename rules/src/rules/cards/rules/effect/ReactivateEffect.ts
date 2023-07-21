import { Effect, PassiveEffectWithConsequences } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { MaterialType } from '../../../../material/MaterialType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'

class ReactivateEffect extends PassiveEffectWithConsequences {

  constructor(game: MaterialGame) {
    super(game)
  }

  beforeMoveTarget(_source: Material, target: Material) {
    return this.activateCreature(target)
  }

  onDiscard(_source: Material, target: Material) {
    return this.activateCreature(target)
  }

  activateCreature(target: Material): MaterialMove[] {
    return this.material(MaterialType.FactionToken).parent(target.getIndex()).moveItems({})
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
