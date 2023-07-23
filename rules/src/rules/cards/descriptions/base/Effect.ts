import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ApplicableFilter } from '../utils/applicable-filter.utils'

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
  onCasterMoveTo(_caster: Material, _target: Material): MaterialMove[] {
    return []
  }

  onCasterMoveAway(_caster: Material, _target: Material): MaterialMove[] {
    return []
  }
}

export const isWithConsequences = (effect: PassiveEffect): effect is PassiveEffectWithConsequences => typeof (effect as any).onReveal === 'function'

