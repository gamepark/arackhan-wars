import { Material, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { ApplicableFilter } from '../utils/applicable-filter.utils'
import { Effect } from './Effect'

export abstract class Ability {

  constructor(readonly filters: ApplicableFilter[] = []) {
  }

  isApplicable(game: MaterialGame, source: Material, target: Material) {
    if (!source.getItem() || !target.getItem()) return false

    return this.filters.every((filter) => filter(source, target, game))
  }

  effect?: Effect
  effects: Effect[] = []

  getEffects(): Effect[] {
    return this.effect ? [this.effect] : this.effects
  }

  abstract getEffectRule(_game: MaterialGame): EffectRule
}

export class EffectRule extends MaterialRulesPart {
// Maybe do another class ?
}
