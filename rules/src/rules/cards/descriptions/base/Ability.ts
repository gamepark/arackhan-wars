import { Material, MaterialGame } from '@gamepark/rules-api'
import { AbilityTargetFilter, itself } from './AbilityTargetFilter'
import { Effect, EffectType, LoseAttributes, TriggerAction, TriggerCondition } from './Effect'
import { AttackCondition, AttackLimitation } from './AttackLimitation'
import { Attribute, AttributeType } from './Attribute'

export class Ability {

  filters: AbilityTargetFilter[] = [itself]
  effects: Effect[] = []

  to(...applicableFilters: AbilityTargetFilter[]) {
    this.filters = applicableFilters
    return this
  }

  isApplicable(game: MaterialGame, source: Material, target: Material) {
    if (!source.getItem() || !target.getItem()) return false

    return this.filters.every((filter) => filter(source, target, game))
  }

  attack(modifier: number) {
    this.effects.push({ type: EffectType.Attack, modifier })
    return this
  }

  defense(modifier: number) {
    this.effects.push({ type: EffectType.Defense, modifier })
    return this
  }

  gainAttributes(...attributes: Attribute[]) {
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

  cannotAttack() {
    this.effects.push({ type: EffectType.CannotAttack })
    return this
  }

  canOnlyAttack(condition: AttackCondition) {
    this.effects.push({ type: EffectType.CanOnlyAttack, condition })
    return this
  }

  cannotBeAttacked(limitation: AttackLimitation) {
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
}

export const attack = (modifier: number) => new Ability().attack(modifier)
export const defense = (modifier: number) => new Ability().defense(modifier)
export const gainAttributes = (...attributes: Attribute[]) => new Ability().gainAttributes(...attributes)
export const loseAttributes = (...attributes: AttributeType[]) => new Ability().loseAttributes(...attributes)
export const loseAttribute = (attribute: AttributeType) => new Ability().loseAttribute(attribute)
export const canOnlyAttack = (condition: AttackCondition) => new Ability().canOnlyAttack(condition)
export const canOnlyBeAttacked = (condition: AttackCondition) => new Ability().canOnlyBeAttacked(condition)
export const cannotBeAttacked = (limitation: AttackLimitation) => new Ability().cannotBeAttacked(limitation)
export const deactivate = (...applicableFilters: AbilityTargetFilter[]) => new Ability().deactivate().to(...applicableFilters)
export const trigger = (action: TriggerAction) => ({ when: (condition: TriggerCondition) => new Ability().trigger(condition, action) })
