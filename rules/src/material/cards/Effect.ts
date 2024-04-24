import { FactionCard } from '../FactionCard'
import { AbilityTargetFilter } from './AbilityTargetFilter'
import { AttackCondition, AttackLimitation } from './AttackLimitation'
import { Attribute, AttributeType } from './Attribute'

export type Effect = ModifyAttack | ModifyDefense
  | GainAttributes | LoseAttributes | LoseSkills
  | AttackerConstraint | DefenderConstraint
  | Deactivated | Mimic | Trigger | ImmuneToEnemySpells
  | EndOfTurn | IgnoreAttackDefenseModifiers | SetAttackDefense
  | SwapSkills | ModifyMovement | InvertsAttackDefense
  | ModifyRange | ExtraScore | IgnoreFellowGroupAttackWeakness
  | CannotBePlayed | HitAllies | Possession | SwarmSameCard
  | AddCharacteristics

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
  InvertsAttackDefense,
  ModifyRange,
  ExtraScore,
  IgnoreFellowGroupAttackWeakness,
  CannotBePlayed,
  HitAllies,
  Possession,
  SwarmSameCard,
  AddCharacteristics,
}

export type ModifyAttack = {
  type: EffectType.Attack
  modifier: number
  condition?: ModifyAttackCondition
}

export enum ModifyAttackCondition {
  TargetFlyOrMoves, TargetFly, TargetInitiative
}

export type ModifyDefense = {
  type: EffectType.Defense
  modifier: number
  condition?: ModifyDefenseCondition
}

export enum ModifyDefenseCondition {
  AttackedByFlyOrMoves
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

export function isNoGroupAttackWeakness(effect: Effect): boolean {
  return effect.type === EffectType.CannotAttack && effect.limitation === AttackLimitation.InGroupWeakness
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
  Attack, FailAttack, DestroyFlyOrMove, EndOfRound
}

export enum TriggerAction {
  Destroy, PutCardUnder
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

export type ModifyRange = {
  type: EffectType.ModifyRange
  modifier: number
}

export type ExtraScore = {
  type: EffectType.ExtraScore
  score: ExtraScoreType
}

export enum ExtraScoreType {
  ValueOfCardsUnder,
  MastersOfAracKhan,
}

export type IgnoreFellowGroupAttackWeakness = {
  type: EffectType.IgnoreFellowGroupAttackWeakness
  filters: AbilityTargetFilter[]
}

export function isIgnoreFellowGroupAttackWeakness(effect: Effect): effect is IgnoreFellowGroupAttackWeakness {
  return effect.type === EffectType.IgnoreFellowGroupAttackWeakness
}

export type CannotBePlayed = {
  type: EffectType.CannotBePlayed
  limitation: RoundLimitation
}

export enum RoundLimitation {
  LastRound
}

export type HitAllies = {
  type: EffectType.HitAllies
}

export type Possession = {
  type: EffectType.Possession
  originalOwner: number
  swapWith?: number
}

export type SwarmSameCard = {
  type: EffectType.SwarmSameCard
}

export type AddCharacteristics = {
  type: EffectType.AddCharacteristics
  card: FactionCard
}

export function isAddCharacteristics(effect: Effect): effect is AddCharacteristics {
  return effect.type === EffectType.AddCharacteristics
}
