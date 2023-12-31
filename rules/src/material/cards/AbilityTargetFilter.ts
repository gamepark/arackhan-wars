import { areAdjacentSquares, Material, MaterialGame } from '@gamepark/rules-api'
import { FactionCardsCharacteristics } from '../FactionCard'
import { isCreature } from './Creature'
import { isLand } from './Land'
import { Family } from './Family'
import { getCardRule } from '../../rules/CardRule'
import { TFunction } from 'i18next'

export type AbilityTargetFilter = {
  filter: (source: Material, target: Material, game: MaterialGame) => boolean
  text?: string
  values?: (t: TFunction) => Record<string, any>
}

export const itself: AbilityTargetFilter = {
  filter: (source: Material, target: Material) => source.getIndex() === target.getIndex(),
  text: 'itself'
}

export const adjacent: AbilityTargetFilter = {
  filter: (source: Material, target: Material) => areAdjacentSquares(source.getItem()!.location, target.getItem()!.location),
  text: 'adjacent'
}

export const enemy: AbilityTargetFilter = {
  filter: (source: Material, target: Material) => source.getItem()!.location.player !== target.getItem()!.location.player,
  text: 'enemy'
}

export const allied: AbilityTargetFilter = {
  filter: (source: Material, target: Material, game: MaterialGame) => !enemy.filter(source, target, game),
  text: 'ally'
}

export const family = (family: Family): AbilityTargetFilter => ({
  filter: (_source: Material, target: Material, game: MaterialGame) => getCardRule(game, target.getIndex()).family === family,
  text: 'family',
  values: (t: TFunction) => ({ family: t(`card.family.${family}`) })
})

export const creature: AbilityTargetFilter = {
  filter: (_source: Material, target: Material) => isCreature(FactionCardsCharacteristics[target.getItem()!.id.front]),
  text: 'creature'
}

export const land: AbilityTargetFilter = {
  filter: (_source: Material, target: Material) => isLand(FactionCardsCharacteristics[target.getItem()!.id.front]),
  text: 'land'
}

export const and = (...filters: AbilityTargetFilter[]) => ({
  filter: (source: Material, target: Material, game: MaterialGame) => filters.some(filter => filter.filter(source, target, game)),
  text: filters.map(filter => filter.text).join('&')
})
