import { Material, MaterialGame } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { merge } from 'lodash'
import { ArackhanWarsRules } from '../../ArackhanWarsRules'
import { getCardRule } from '../../rules/CardRule'
import { Memory } from '../../rules/Memory'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { AbilityTargetFilter } from './AbilityTargetFilter'

export abstract class AbilityCondition {
  abstract match(game: MaterialGame, source: Material): boolean

  abstract getText(t: TFunction): string
}

export class ThereIsOnBattlefield extends AbilityCondition {
  constructor(private filters: AbilityTargetFilter[]) {
    super()
  }

  match(game: MaterialGame, source: Material) {
    const battlefieldCards = new ArackhanWarsRules(game).material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return battlefieldCards.getIndexes().some(index => this.filters.every(filter => filter.filter(source, battlefieldCards.index(index), game)))
  }

  getText(t: TFunction) {
    return t('if.there-is', {
      target: t(`target.${this.filters.map(filter => filter.text).join('.')}`, this.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {}))
    })
  }
}

export const thereIs = (...filters: AbilityTargetFilter[]) => new ThereIsOnBattlefield(filters)

export class ThereIsNotOnBattlefield extends AbilityCondition {
  constructor(private filters: AbilityTargetFilter[]) {
    super()
  }

  match(game: MaterialGame, source: Material) {
    const battlefieldCards = new ArackhanWarsRules(game).material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return !battlefieldCards.getIndexes().some(index => this.filters.every(filter => filter.filter(source, battlefieldCards.index(index), game)))
  }

  getText(t: TFunction) {
    return t('if.there-is-not', {
      target: t(`target.${this.filters.map(filter => filter.text).join('.')}`, this.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {}))
    })
  }
}

export const thereIsNot = (...filters: AbilityTargetFilter[]) => new ThereIsNotOnBattlefield(filters)

export class StartRound extends AbilityCondition {
  match(game: MaterialGame, source: Material) {
    const rules = new ArackhanWarsRules(game)
    return rules.remind(Memory.StartPlayer) === source.getItem()?.location?.player
  }

  getText(t: TFunction) {
    return t('if.start-round')
  }
}

export const startRound = new StartRound()

export class DoNotStartRound extends AbilityCondition {
  match(game: MaterialGame, source: Material) {
    const rules = new ArackhanWarsRules(game)
    return rules.remind(Memory.StartPlayer) !== source.getItem()?.location?.player
  }

  getText(t: TFunction) {
    return t('if.no-start-round')
  }
}

export const doNotStartRound = new DoNotStartRound()

export class IsActive extends AbilityCondition {
  match(game: MaterialGame, source: Material) {
    return getCardRule(game, source.getIndex()).hasActiveToken
  }

  getText(t: TFunction) {
    return t('if.active')
  }
}

export const isActive = new IsActive()