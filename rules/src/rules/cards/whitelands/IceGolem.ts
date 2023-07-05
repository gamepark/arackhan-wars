import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class IceGolem extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.IceGolem
  attack = 3
  defense = 3
  attributes = [{ type: CardAttributeType.Perforation }]
}
