import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class SiegeTower extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.SiegeTower
  value = 10
  attack = 4
  defense = 1
  attributes = [{ type: CardAttributeType.Perforation }]
}
