import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class Ballista extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
  quantity = 2
}
