import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class NakkaArcher extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 2 }]
  quantity = 3
}
