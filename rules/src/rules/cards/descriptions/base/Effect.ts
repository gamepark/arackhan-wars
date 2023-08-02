export type Effect = LoseSkills | Deactivated

export enum EffectType {
  LoseSkills, Deactivated
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
