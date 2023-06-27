import { Faction } from '../../Faction'

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
  attack?: number = 0
  defense?: number = 0
  astral?: boolean = false
  quantity?: number = 1
  attributes?: CardAttribute[] = []
}

export {
  FactionCardRule
}
