import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ApplicableFilter } from '../utils/applicable-filter.utils'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'

export abstract class Effect {

  constructor(readonly filters: ApplicableFilter[] = []) {
  }

  isApplicable(_source: Material, _target: Material) {
    if (!_source.getItem() || !_target.getItem()) return false

    return this.filters.every((filter) => filter(_source, _target))
  }

  abstract getEffectRule(_game: MaterialGame): PassiveEffect
}

export class PassiveEffect extends MaterialRulesPart {
// Maybe do another class ?
}

export class PassiveEffectWithConsequences extends PassiveEffect {
  onReveal(_source: Material, _target: Material): MaterialMove[] {
    return []
  }

  beforeMoveTarget(_source: Material, _target: Material): MaterialMove[] {
    return []
  }

  afterMoveTarget(_source: Material, _target: Material): MaterialMove[] {
    return []
  }

  onDiscard(_source: Material, _target: Material): MaterialMove[] {
    return []
  }
}

export const isWithConsequences = (effect: PassiveEffect): effect is PassiveEffectWithConsequences => typeof (effect as any).onReveal === 'function'

