import { Material, MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter, itself } from '../utils/applicable-filter.utils'
import { Effect, EffectType } from './Effect'
import { CardAttributeType } from './FactionCardCharacteristics'

export class Ability {

  filters: ApplicableFilter[] = [itself]
  effects: Effect[] = []

  to(...applicableFilters: ApplicableFilter[]) {
    this.filters = applicableFilters
    return this
  }

  isApplicable(game: MaterialGame, source: Material, target: Material) {
    if (!source.getItem() || !target.getItem()) return false

    return this.filters.every((filter) => filter(source, target, game))
  }

  effect?: Effect

  getEffects(): Effect[] {
    return this.effect ? [this.effect] : this.effects
  }

  attack(modifier: number) {
    this.effects.push({ type: EffectType.Attack, modifier })
    return this
  }

  defense(modifier: number) {
    this.effects.push({ type: EffectType.Defense, modifier })
    return this
  }

  gainAttributes(...attributes: CardAttributeType[]) {
    this.effects.push({ type: EffectType.GainAttributes, attributes })
    return this
  }
}

export const attack = (modifier: number) => new Ability().attack(modifier)
export const defense = (modifier: number) => new Ability().defense(modifier)
export const gainAttributes = (...attributes: CardAttributeType[]) => new Ability().gainAttributes(...attributes)