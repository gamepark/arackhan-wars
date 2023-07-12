import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Xenodon extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Xenodon
  value = 3
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
  quantity = 3
}
