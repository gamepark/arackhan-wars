import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ApplicableFilter } from '../utils/applicable-filter.utils'

export abstract class Effect {

  constructor(readonly filters: ApplicableFilter[] = []) {
  }

  isApplicable(game: MaterialGame, source: Material, target: Material) {
    if (!source.getItem() || !target.getItem()) return false

    return this.filters.every((filter) => filter(source, target, game))
  }

  abstract getEffectRule(_game: MaterialGame): EffectRule
}

export class EffectRule extends MaterialRulesPart {
// Maybe do another class ?
}

export class PassiveEffectWithConsequences extends EffectRule {
  onCasterMoveTo(_caster: Material, _target: Material): MaterialMove[] {
    return []
  }

  onCasterMoveAway(_caster: Material, _target: Material): MaterialMove[] {
    return []
  }
}

export const isWithConsequences = (effect: EffectRule): effect is PassiveEffectWithConsequences => typeof (effect as any).onReveal === 'function'

