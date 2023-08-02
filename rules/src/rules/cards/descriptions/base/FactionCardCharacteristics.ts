import { Faction } from '../../../../Faction'
import { Ability } from './Ability'
import { Attribute } from '../../rules/attribute/Attribute'
import { RuleId } from '../../../RuleId'

export enum CardAttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangedAttack,
  Omnistrike,
  Regeneration,
  Swarm
}

export type CardAttribute = {
  type: CardAttributeType,
  strength?: number
}

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

  hasInitiative = () => this.hasAttribute(CardAttributeType.Initiative)
  hasOmnistrike = () => this.hasAttribute(CardAttributeType.Omnistrike)
  hasPerforation = () => this.hasAttribute(CardAttributeType.Perforation)
  hasRangeAttack = () => this.hasAttribute(CardAttributeType.RangedAttack)
  canFly = () => this.hasAttribute(CardAttributeType.Flight)
  hasMovement = () => this.hasAttribute(CardAttributeType.Movement)
  canMove = () => this.hasMovement() ?? this.canFly()

  canAttack = (): boolean => false

  private hasAttribute = (type: CardAttributeType) => this.getAttributes().some(attribute => attribute.type === type)

  getLimit() {
    return this.legendary ? 1 : this.limit ?? Infinity
  }

  getDeckBuildingValue() {
    return this.deckBuildingValue ?? this.value
  }
}
