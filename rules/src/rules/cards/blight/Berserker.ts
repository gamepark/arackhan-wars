import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class Berserker extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 2
  attributes = [
    { type: CardAttributeType.Initiative },
    { type: CardAttributeType.Omnistrike }
  ]
}
