import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class ChildEater extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.ChildEater
  attack = 4
  defense = 2
  attributes = [{ type: CardAttributeType.Perforation }]
}
