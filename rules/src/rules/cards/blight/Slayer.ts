import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class Slayer extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
