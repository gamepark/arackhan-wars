import { FactionCard } from '../../../../material/FactionCard'
import { CardAttributeType } from './FactionCardCharacteristics'
import { AttackLimitation } from './AttackLimitation'

export type Effect = ModifyAttack | ModifyDefense
  | GainAttributes | LoseAttributes | LoseSkills
  | CannotAttack | CannotBeAttacked
  | Deactivated | Mimic | Trigger

export enum EffectType {
  Attack, Defense,
  GainAttributes, LoseAttributes,
  LoseSkills,
  CannotAttack, CannotBeAttacked,
  Deactivated,
  Mimic,
  Trigger
}

export type ModifyAttack = {
  type: EffectType.Attack
  value: number
}

export type ModifyDefense = {
  type: EffectType.Defense
  value: number
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

export type CannotAttack = {
  type: EffectType.CannotAttack
  except?: AttackLimitation
}

export type CannotBeAttacked = {
  type: EffectType.CannotBeAttacked
  except?: AttackLimitation
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

export type Trigger = {
  type: EffectType.Trigger
  condition: TriggerCondition
  action: TriggerAction
}

export enum TriggerCondition {
  FailAttack
}

export enum TriggerAction {
  SelfDestroy
}
