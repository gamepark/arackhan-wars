import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Eagle extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Eagle
  value = 5
  attack = 1
  defense = 1
  quantity = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
