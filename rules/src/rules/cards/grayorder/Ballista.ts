import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Ballista extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Ballista
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
  quantity = 2
}
