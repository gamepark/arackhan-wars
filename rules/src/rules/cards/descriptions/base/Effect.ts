import { FactionCard } from '../../../../material/FactionCard'

export type Effect = LoseSkills | Deactivated | Mimic

export enum EffectType {
  LoseSkills, Deactivated, Mimic
}

export type LoseSkills = {
  type: EffectType.LoseSkills
}

export function isLoseSkills(effect: Effect): effect is LoseSkills {
  return effect.type === EffectType.LoseSkills
}

export type Deactivated = {
  type: EffectType.Deactivated
}

export type Mimic = {
  type: EffectType.Mimic
  target: FactionCard
}

export function isMimic(effect: Effect): effect is Mimic {
  return effect.type === EffectType.Mimic
}
