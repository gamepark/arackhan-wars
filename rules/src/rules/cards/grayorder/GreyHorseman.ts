import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class GreyHorseman extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.GreyHorseman
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
}
