import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class SnowGriffin extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.SnowGriffin
  value = 7
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Flight }]
  quantity = 2
}
