import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class Eagle extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
