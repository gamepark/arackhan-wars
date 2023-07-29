import { MaterialGame } from '@gamepark/rules-api'

export type TurnEffect = MimicryEffect

export enum TurnEffectType {
  Mimicry = 1
}

export type MimicryEffect = {
  type: TurnEffectType.Mimicry
  target: number
  copied: number
}

export const getTurnEffects = (game: MaterialGame): TurnEffect[] => {
  return game.rule?.memory?.turnEffects ?? []
}

export type TurnEffectsMemory = {
  turnEffects?: TurnEffect[]
}
