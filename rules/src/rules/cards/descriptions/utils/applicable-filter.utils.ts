import { Material } from '@gamepark/rules-api'
import { areAdjacent } from '../../../../utils/adjacent.utils'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { isCreature } from '../base/Creature'
import { isLand } from '../base/Land'


export type ApplicableFilter = (_source: Material, _target: Material) => boolean

export const himself = (source: Material, target: Material) => source.getIndex() === target.getIndex()
export const adjacent = (source: Material, target: Material) => areAdjacent(source, target)

export const enemy = (source: Material, target: Material) => source.getItem()!.location.player !== target.getItem()!.location.player
export const allied = (source: Material, target: Material) => !enemy(source, target)
export const family = (family: string) => (_source: Material, target: Material) => getFactionCardDescription(target.getItem()!.id.front).family === family

export const creature = (_source: Material, target: Material) => isCreature(getFactionCardDescription(target.getItem()!.id.front))
export const land = (_source: Material, target: Material) => isLand(getFactionCardDescription(target.getItem()!.id.front))
export const or = (...filters: ApplicableFilter[]) => (source: Material, target: Material) => filters.some(filter => filter(source, target))
