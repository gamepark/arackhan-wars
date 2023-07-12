import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Infantryman extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Infantryman
  value = 3
  attack = 1
  defense = 1
  quantity = 3
  family = '6th-legion'
}
