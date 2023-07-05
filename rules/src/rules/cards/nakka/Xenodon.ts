import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Xenodon extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Xenodon
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
  quantity = 3
}
