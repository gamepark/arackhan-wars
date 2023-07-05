import { Faction } from '../../Faction'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from '../../ArackhanWarsOptions'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'

export enum CardAttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangeAttack,
  Omnistrike
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

abstract class FactionCardRule {
  abstract faction: Faction
  abstract kind: FactionCardKind
  attack?: number
  defense?: number
  astral?: boolean = false
  quantity?: number = 1
  attributes?: CardAttribute[] = []

  canAttack = (_attacker: MaterialItem<PlayerId, MaterialType, LocationType>, _opponent: MaterialItem<PlayerId, MaterialType, LocationType>) => {

    // TODO: check distance, effects etc.
    return this.attack !== undefined
  }

  canMove = () => {
    return this.hasAttribute(CardAttributeType.Movement) || this.hasAttribute(CardAttributeType.Flight)
  }

  hasInitiative = () => this.hasAttribute(CardAttributeType.Initiative)
  hasOmnistrike = () => this.hasAttribute(CardAttributeType.Omnistrike)

  private hasAttribute = (attribute: CardAttributeType) => !!this.attributes?.some((a) => a.type === attribute)
}

export {
  FactionCardRule
}
