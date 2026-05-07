import { Material, MaterialGame } from '@gamepark/rules-api'
import type { AbilityCondition } from './AbilityCondition'
import type { AbilityTargetFilter } from './AbilityTargetFilter'
import type { AttackCondition, AttackLimitation } from './AttackLimitation'
import type { Attribute, AttributeType } from './Attribute'
import {
  Effect,
  EffectType,
  EndOfTurnAction,
  ExtraScoreType,
  LoseAttributes,
  ModifyAttackCondition,
  ModifyDefenseCondition,
  ModifyMovementCondition,
  RoundLimitation,
  TriggerAction,
  TriggerCondition
} from './Effect'

const itself: AbilityTargetFilter = {
  filter: (source: Material, target: Material) => source.getIndex() === target.getIndex(),
  text: 'itself'
}

export class Ability {

  filters: AbilityTargetFilter[] = [itself]
  multipliers?: AbilityTargetFilter[] | AbilityMultiplier
  condition?: AbilityCondition
  effects: Effect[] = []

  to(...applicableFilters: AbilityTargetFilter[]) {
    this.filters = applicableFilters
    return this
  }

  forEach(...applicableFilters: AbilityTargetFilter[]) {
    this.multipliers = applicableFilters
    return this
  }

  per(multiplier: AbilityMultiplier) {
    this.multipliers = multiplier
    return this
  }

  if(condition: AbilityCondition) {
    this.condition = condition
    return this
  }

  isApplicable(game: MaterialGame, source: Material, target: Material) {
    if (!source.getItem() || !target.getItem()) return false
    if (this.condition && !this.condition.match(game, source)) return false
    return this.filters.every(filter => filter.filter(source, target, game))
  }

  attack(modifier: number, condition?: ModifyAttackCondition) {
    this.effects.push({ type: EffectType.Attack, modifier, condition })
    return this
  }

  defense(modifier: number, condition?: ModifyDefenseCondition) {
    this.effects.push({ type: EffectType.Defense, modifier, condition })
    return this
  }

  gainAttributes(attributes: Attribute[]) {
    this.effects.push({ type: EffectType.GainAttributes, attributes })
    return this
  }

  loseAttributes(...attributes: AttributeType[]) {
    const effect: LoseAttributes = { type: EffectType.LoseAttributes }
    if (attributes.length > 0) effect.attributes = attributes
    this.effects.push(effect)
    return this
  }

  loseAttribute(attribute: AttributeType) {
    return this.loseAttributes(attribute)
  }

  loseSkills() {
    this.effects.push({ type: EffectType.LoseSkills })
    return this
  }

  cannotAttack(limitation?: AttackLimitation) {
    this.effects.push({ type: EffectType.CannotAttack, limitation })
    return this
  }

  canOnlyAttack(condition: AttackCondition) {
    this.effects.push({ type: EffectType.CanOnlyAttack, condition })
    return this
  }

  cannotBeAttacked(limitation?: AttackLimitation) {
    this.effects.push({ type: EffectType.CannotBeAttacked, limitation })
    return this
  }

  canOnlyBeAttacked(condition: AttackCondition) {
    this.effects.push({ type: EffectType.CanOnlyBeAttacked, condition })
    return this
  }

  deactivate() {
    this.effects.push({ type: EffectType.Deactivated })
    return this
  }

  trigger(condition: TriggerCondition, action: TriggerAction) {
    this.effects.push({ type: EffectType.Trigger, condition, action })
    return this
  }

  immuneToEnemySpells() {
    this.effects.push({ type: EffectType.ImmuneToEnemySpells })
    return this
  }

  endOfTurn(action: EndOfTurnAction) {
    this.effects.push({ type: EffectType.EndOfTurn, action })
    return this
  }

  ignoreAttackDefenseModifiers() {
    this.effects.push({ type: EffectType.IgnoreAttackDefenseModifiers })
    return this
  }

  modifyMovement(modifier: number, ...conditions: ModifyMovementCondition[]) {
    this.effects.push({ type: EffectType.ModifyMovement, modifier, conditions })
    return this
  }

  invertsAttackDefense() {
    this.effects.push({ type: EffectType.InvertsAttackDefense })
    return this
  }

  range(modifier: number) {
    this.effects.push({ type: EffectType.ModifyRange, modifier })
    return this
  }

  extraScore(score: ExtraScoreType) {
    this.effects.push({ type: EffectType.ExtraScore, score })
    return this
  }

  ignoreFellowGroupAttackerConstraint(filters: AbilityTargetFilter[]) {
    this.effects.push({ type: EffectType.IgnoreFellowGroupAttackWeakness, filters })
    return this
  }

  cannotBePlayed(limitation: RoundLimitation) {
    this.effects.push({ type: EffectType.CannotBePlayed, limitation })
    return this
  }

  hitAllies() {
    this.effects.push({ type: EffectType.HitAllies })
    return this
  }

  swarmSameCard() {
    this.effects.push({ type: EffectType.SwarmSameCard })
    return this
  }
}

export enum AbilityMultiplier {
  ExtraFactionToken
}

export const attack = (modifier: number, condition?: ModifyAttackCondition) => new Ability().attack(modifier, condition)
export const defense = (modifier: number, condition?: ModifyDefenseCondition) => new Ability().defense(modifier, condition)
export const gainAttribute = (attribute: Attribute) => new Ability().gainAttributes([attribute])
export const loseAttributes = (...attributes: AttributeType[]) => new Ability().loseAttributes(...attributes)
export const loseAttribute = (attribute: AttributeType) => new Ability().loseAttribute(attribute)
export const loseSkills = () => new Ability().loseSkills()
export const cannotAttack = (limitation?: AttackLimitation) => new Ability().cannotAttack(limitation)
export const canOnlyAttack = (condition: AttackCondition) => new Ability().canOnlyAttack(condition)
export const canOnlyBeAttacked = (condition: AttackCondition) => new Ability().canOnlyBeAttacked(condition)
export const cannotBeAttacked = (limitation?: AttackLimitation) => new Ability().cannotBeAttacked(limitation)
export const deactivate = (...applicableFilters: AbilityTargetFilter[]) => new Ability().deactivate().to(...applicableFilters)
export const trigger = (action: TriggerAction) => ({ when: (condition: TriggerCondition) => new Ability().trigger(condition, action) })
export const immuneToEnemySpells = () => new Ability().immuneToEnemySpells()
export const endOfTurn = (action: EndOfTurnAction) => new Ability().endOfTurn(action)
export const ignoreAttackDefenseModifiers = () => new Ability().ignoreAttackDefenseModifiers()
export const modifyMovement = (modifier: number, ...conditions: ModifyMovementCondition[]) => new Ability().modifyMovement(modifier, ...conditions)
export const invertsAttackDefense = () => new Ability().invertsAttackDefense()
export const range = (modifier: number) => new Ability().range(modifier)
export const extraScore = (score: ExtraScoreType) => new Ability().extraScore(score)
export const ignoreFellowGroupAttackerConstraint = (...filters: AbilityTargetFilter[]) => new Ability().ignoreFellowGroupAttackerConstraint(filters)
export const cannotBePlayed = (limitation: RoundLimitation) => new Ability().cannotBePlayed(limitation)
export const hitAllies = () => new Ability().hitAllies()
export const swarmSameCard = () => new Ability().swarmSameCard()