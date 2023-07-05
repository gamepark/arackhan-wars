import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class GreyHorseman extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
}
