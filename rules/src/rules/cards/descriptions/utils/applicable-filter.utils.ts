import { Material, MaterialGame } from '@gamepark/rules-api'
import { areAdjacentCards } from '../../../../utils/adjacent.utils'
import { FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { isCreature } from '../base/Creature'
import { isLand } from '../base/Land'
import { Family } from '../base/Family'
import { getCardRule } from '../../rules/base/CardRule'

export type ApplicableFilter = (source: Material, target: Material, game: MaterialGame) => boolean

export const itself = (source: Material, target: Material) => source.getIndex() === target.getIndex()
export const adjacent = (source: Material, target: Material) => areAdjacentCards(source, target)

export const enemy = (source: Material, target: Material) => source.getItem()!.location.player !== target.getItem()!.location.player
export const allied = (source: Material, target: Material) => !enemy(source, target)
export const family = (family: Family) => (_source: Material, target: Material, game: MaterialGame) => {
  const details = getCardRule(game, target.getIndex()).characteristics
  return isCreature(details) && details.family === family
}

export const creature = (_source: Material, target: Material) => isCreature(FactionCardsCharacteristics[target.getItem()!.id.front])
export const land = (_source: Material, target: Material) => isLand(FactionCardsCharacteristics[target.getItem()!.id.front])
export const or = (...filters: ApplicableFilter[]) => (source: Material, target: Material, game: MaterialGame) => filters.some(filter => filter(source, target, game))
