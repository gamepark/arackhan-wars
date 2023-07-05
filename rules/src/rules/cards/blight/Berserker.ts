import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Berserker extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Berserker
  attack = 1
  defense = 1
  quantity = 2
  attributes = [
    { type: CardAttributeType.Initiative },
    { type: CardAttributeType.Omnistrike }
  ]
}
