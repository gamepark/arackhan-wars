import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Eagle extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Eagle
  attack = 1
  defense = 1
  quantity = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
