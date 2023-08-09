import { FactionCard } from '../../../../material/FactionCard'
import { CardAttributeType } from './FactionCardCharacteristics'
import { AttackCondition, AttackLimitation } from './AttackLimitation'

export type Effect = ModifyAttack | ModifyDefense
  | GainAttributes | LoseAttributes | LoseSkills
  | AttackerConstraint | DefenderConstraint
  | Deactivated | Mimic | Trigger

export enum EffectType {
  Attack, Defense,
  GainAttributes, LoseAttributes,
  LoseSkills,
  CannotAttack, CanOnlyAttack, CannotBeAttacked, CanOnlyBeAttacked,
  Deactivated,
  Mimic,
  Trigger
}

export type ModifyAttack = {
  type: EffectType.Attack
  modifier: number
}

export type ModifyDefense = {
  type: EffectType.Defense
  modifier: number
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
  limitation?: AttackLimitation
}

export type CanOnlyAttack = {
  type: EffectType.CanOnlyAttack
  condition: AttackCondition
}

export type CannotBeAttacked = {
  type: EffectType.CannotBeAttacked
  limitation?: AttackLimitation
}

export type CanOnlyBeAttacked = {
  type: EffectType.CanOnlyBeAttacked
  condition: AttackCondition
}

export type AttackerConstraint = CannotAttack | CanOnlyAttack
export type DefenderConstraint = CannotBeAttacked | CanOnlyBeAttacked

export function isAttackerConstraint(effect: Effect): effect is AttackerConstraint {
  return effect.type === EffectType.CannotAttack || effect.type === EffectType.CanOnlyAttack
}

export function isDefenderConstraint(effect: Effect): effect is DefenderConstraint {
  return effect.type === EffectType.CannotBeAttacked || effect.type === EffectType.CanOnlyBeAttacked
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
