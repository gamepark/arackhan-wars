import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class SnowGriffin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Flight }]
  quantity = 2
}
