import { Faction } from '../../../Faction'
import { FactionCard } from '../../../material/FactionCard'

export enum CardAttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangeAttack,
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

export abstract class FactionCardDetail {
  abstract faction: Faction
  abstract kind: FactionCardKind
  abstract id: FactionCard
  abstract value: number
  attack?: number
  defense?: number
  astral?: boolean = false
  quantity?: number = 1
  attributes?: CardAttribute[] = []
  family?: string

  hasInitiative = () => this.hasAttribute(CardAttributeType.Initiative)
  hasOmnistrike = () => this.hasAttribute(CardAttributeType.Omnistrike)
  canFly = () => this.hasAttribute(CardAttributeType.Flight)
  hasMovement = () => this.hasAttribute(CardAttributeType.Movement) ?? this.canFly()


  canAttack = () => this.attack !== undefined

  getRangeAttack = () => this.getAttribute(CardAttributeType.RangeAttack)

  private hasAttribute = (attribute: CardAttributeType) => !!this.attributes?.some((a) => a.type === attribute)

  private getAttribute = (attribute: CardAttributeType) => this.attributes?.find((a) => a.type === attribute)


}
