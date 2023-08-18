import { Faction } from '../Faction'
import { Ability } from './Ability'
import { Attribute } from './Attribute'
import { RuleId } from '../../rules/RuleId'

export enum FactionCardKind {
  Creature = 1,
  Spell,
  Land,
}

export enum DiscardTiming {
  EndOfRound = 1,
  ActivationOrEndOfTurn
}

export abstract class FactionCardCharacteristics {
  abstract faction: Faction
  abstract kind: FactionCardKind
  abstract value: number
  deckBuildingValue?: number
  protected limit?: number
  legendary = false
  action?: RuleId

  protected attribute?: Attribute
  protected attributes: Attribute[] = []

  getAttributes() {
    return this.attribute ? [this.attribute] : this.attributes
  }

  abstract getAbilities(): Ability[]

  canAttack = (): boolean => false

  getLimit() {
    return this.legendary ? 1 : this.limit ?? Infinity
  }

  getDeckBuildingValue() {
    return this.deckBuildingValue ?? this.value
  }
}
