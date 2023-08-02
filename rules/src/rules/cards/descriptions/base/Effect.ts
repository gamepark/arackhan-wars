import { FactionCard } from '../../../../material/FactionCard'
import { CardAttributeType } from './FactionCardCharacteristics'

export type Effect = GainAttributes | LoseAttributes | LoseSkills | Deactivated | Mimic

export enum EffectType {
  GainAttributes, LoseAttributes, LoseSkills, Deactivated, Mimic
}

export type GainAttributes = {
  type: EffectType.GainAttributes
  attributes: CardAttributeType[] // TODO: should be type "Attribute"
}

export function isGainAttributes(effect: Effect): effect is GainAttributes {
  return effect.type === EffectType.GainAttributes
}

export type LoseAttributes = {
  type: EffectType.LoseAttributes
  attributes?: CardAttributeType[] // TODO: should be type "Attribute"
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
