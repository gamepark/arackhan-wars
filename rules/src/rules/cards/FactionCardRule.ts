import { Faction } from '../../Faction'

export enum CardAttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangeAttack,
  Omnistrike
}

type FactionCardAttribute = {
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
  attributes?: FactionCardAttribute[] = []
}

export {
  FactionCardRule
}
