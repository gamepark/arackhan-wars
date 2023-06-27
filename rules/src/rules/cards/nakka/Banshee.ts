import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class Banshee extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Initiative }]
  quantity = 2
}
