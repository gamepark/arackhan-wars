import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Banshee extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Banshee
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Initiative }]
  quantity = 2
}
