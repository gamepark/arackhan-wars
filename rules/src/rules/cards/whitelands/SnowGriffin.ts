import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class SnowGriffin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.SnowGriffin
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Flight }]
  quantity = 2
}
