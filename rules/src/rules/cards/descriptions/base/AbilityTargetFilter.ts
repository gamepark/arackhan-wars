import { Material, MaterialGame } from '@gamepark/rules-api'
import { areAdjacentCards } from '../../../../utils/adjacent.utils'
import { FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { isCreature } from './Creature'
import { isLand } from './Land'
import { Family } from './Family'
import { getCardRule } from '../../rules/base/CardRule'

export type AbilityTargetFilter = (source: Material, target: Material, game: MaterialGame) => boolean

export const itself = (source: Material, target: Material) => source.getIndex() === target.getIndex()
export const adjacent = (source: Material, target: Material) => areAdjacentCards(source, target)

export const enemy = (source: Material, target: Material) => source.getItem()!.location.player !== target.getItem()!.location.player
export const allied = (source: Material, target: Material) => !enemy(source, target)
export const family = (family: Family) => (_source: Material, target: Material, game: MaterialGame) => getCardRule(game, target.getIndex()).family === family

export const creature = (_source: Material, target: Material) => isCreature(FactionCardsCharacteristics[target.getItem()!.id.front])
export const land = (_source: Material, target: Material) => isLand(FactionCardsCharacteristics[target.getItem()!.id.front])
export const or = (...filters: AbilityTargetFilter[]) => (source: Material, target: Material, game: MaterialGame) => filters.some(filter => filter(source, target, game))
