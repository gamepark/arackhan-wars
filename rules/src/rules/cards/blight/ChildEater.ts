import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class ChildEater extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 4
  defense = 2
  attributes = [{ type: CardAttributeType.Perforation }]
}
