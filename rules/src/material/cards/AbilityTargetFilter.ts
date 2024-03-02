import { areAdjacentSquares, Material, MaterialGame } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { getCardRule } from '../../rules/CardRule'
import { FactionCardsCharacteristics } from '../FactionCard'
import { AttributeType } from './Attribute'
import { isCreature } from './Creature'
import { Family } from './Family'
import { isLand } from './Land'

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

export const maxValue = (value: number): AbilityTargetFilter => ({
  filter: (_source: Material, target: Material, game: MaterialGame) => getCardRule(game, target.getIndex()).value <= value,
  text: 'max-value',
  values: () => ({ maxValue })
})

export const withAttribute = (attributeType: AttributeType): AbilityTargetFilter => ({
  filter: (_source: Material, target: Material, game: MaterialGame) =>
    getCardRule(game, target.getIndex()).attributes.some(attribute => attribute.type === attributeType),
  text: 'attribute',
  values: (t: TFunction) => ({ attribute: t(`attribute.${attributeType}`) })
})

export const and = (...filters: AbilityTargetFilter[]) => ({
  filter: (source: Material, target: Material, game: MaterialGame) => filters.some(filter => filter.filter(source, target, game)),
  text: filters.map(filter => filter.text).join('&')
})
