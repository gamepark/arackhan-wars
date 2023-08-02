import { MaterialGame } from '@gamepark/rules-api'
import { Effect } from '../../descriptions/base/Effect'

export type TurnEffect = {
  targets: number[]
  effect: Effect
}

export enum TurnEffectType {
  Mimicry = 1
}

export const getTurnEffects = (game: MaterialGame): TurnEffect[] => {
  return game.memory?.turnEffects ?? []
}
