import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class DrunkKnight extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.DrunkKnight
  value = 1
  attack = 1
  defense = 1
  quantity = 4
}
