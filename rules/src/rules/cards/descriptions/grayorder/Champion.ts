import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Champion extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Champion
  value = 8
  attack = 2
  defense = 2
  quantity = 2
  family = '6th-legion'
}
