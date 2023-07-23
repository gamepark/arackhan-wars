import { Faction } from '../../../../Faction'
import { FactionCard } from '../../../../material/FactionCard'
import { Effect } from './Effect'
import { Attribute } from '../../rules/attribute/Attribute'

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

export abstract class FactionCardDetail {
  abstract faction: Faction
  abstract kind: FactionCardKind
  abstract id: FactionCard
  abstract value: number
  quantity?: number = 1
  attribute?: Attribute
  attributes: Attribute[] = []
  family?: string

  getAttributes(): Attribute[] {
    return this.attribute ? [this.attribute] : this.attributes
  }

  abstract getPassiveEffects(): Effect[]

  hasInitiative = () => this.hasAttribute(CardAttributeType.Initiative)
  hasOmnistrike = () => this.hasAttribute(CardAttributeType.Omnistrike)
  hasPerforation = () => this.hasAttribute(CardAttributeType.Perforation)
  hasRangeAttack = () => this.hasAttribute(CardAttributeType.RangedAttack)
  canFly = () => this.hasAttribute(CardAttributeType.Flight)
  hasMovement = () => this.hasAttribute(CardAttributeType.Movement)
  canMove = () => this.hasMovement() ?? this.canFly()

  canAttack = (): boolean => false

  private hasAttribute = (attribute: CardAttributeType) => this.getAttributes().some((a) => a.type === attribute)
}
