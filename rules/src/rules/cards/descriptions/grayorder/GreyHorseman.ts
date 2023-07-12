import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class GreyHorseman extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.GreyHorseman
  value = 7
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
}
