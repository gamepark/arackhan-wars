import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Ballista extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Ballista
  value = 5
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
  quantity = 2
  family = 'artillery'
}
