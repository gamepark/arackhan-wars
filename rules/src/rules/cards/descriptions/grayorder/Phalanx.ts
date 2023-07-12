import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Phalanx extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Phalanx
  value = 3
  attack = 1
  defense = 1
  quantity = 3
}
