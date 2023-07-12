import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Banshee extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Banshee
  value = 6
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Initiative }]
  quantity = 2
}
