import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Slayer extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Slayer
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
