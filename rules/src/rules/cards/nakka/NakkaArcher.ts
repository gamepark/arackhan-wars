import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class NakkaArcher extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.NakkaArcher
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 2 }]
  quantity = 3
}
