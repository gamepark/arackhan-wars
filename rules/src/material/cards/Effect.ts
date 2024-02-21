import { FactionCard } from '../FactionCard'
import { AttackCondition, AttackLimitation } from './AttackLimitation'
import { Attribute, AttributeType } from './Attribute'

export type Effect = ModifyAttack | ModifyDefense
  | GainAttributes | LoseAttributes | LoseSkills
  | AttackerConstraint | DefenderConstraint
  | Deactivated | Mimic | Trigger | ImmuneToEnemySpells
  | EndOfTurn | IgnoreAttackDefenseModifiers | SetAttackDefense
  | SwapSkills | ModifyMovement | InvertsAttackDefense

export enum EffectType {
  Attack, Defense,
  GainAttributes, LoseAttributes,
  LoseSkills,
  CannotAttack, CanOnlyAttack, CannotBeAttacked, CanOnlyBeAttacked,
  Deactivated,
  Mimic,
  Trigger,
  ImmuneToEnemySpells,
  EndOfTurn,
  IgnoreAttackDefenseModifiers, SetAttackDefense,
  SwapSkills,
  ModifyMovement,
  InvertsAttackDefense
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
  attributes: Attribute[]
}

export function isGainAttributes(effect: Effect): effect is GainAttributes {
  return effect.type === EffectType.GainAttributes
}

export type LoseAttributes = {
  type: EffectType.LoseAttributes
  attributes?: AttributeType[]
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

export type ImmuneToEnemySpells = {
  type: EffectType.ImmuneToEnemySpells
}

export type EndOfTurn = {
  type: EffectType.EndOfTurn
  action: EndOfTurnAction
}

export enum EndOfTurnAction {
  Move
}

export type IgnoreAttackDefenseModifiers = {
  type: EffectType.IgnoreAttackDefenseModifiers
}

export type SetAttackDefense = {
  type: EffectType.SetAttackDefense
  attack: number
  defense: number
}

export function isSetAttackDefense(effect: Effect): effect is SetAttackDefense {
  return effect.type === EffectType.SetAttackDefense
}

export type SwapSkills = {
  type: EffectType.SwapSkills
  creatures: number[]
}

export function isSwapSkills(effect: Effect): effect is SwapSkills {
  return effect.type === EffectType.SwapSkills
}

export type ModifyMovement = {
  type: EffectType.ModifyMovement
  modifier: number
  conditions: ModifyMovementCondition[]
}

export enum ModifyMovementCondition {
  DoNotAttack, EndMovementAdjacentToEnemyCard
}

export type InvertsAttackDefense = {
  type: EffectType.InvertsAttackDefense
}
