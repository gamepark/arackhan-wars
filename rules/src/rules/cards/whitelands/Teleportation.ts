import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class Teleportation extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
