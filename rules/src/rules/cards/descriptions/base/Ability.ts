import { Material, MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter, itself } from '../utils/applicable-filter.utils'
import { Effect } from './Effect'

export class Ability {

  filters: ApplicableFilter[] = [itself]

  to(...applicableFilters: ApplicableFilter[]) {
    this.filters = applicableFilters
    return this
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
}
