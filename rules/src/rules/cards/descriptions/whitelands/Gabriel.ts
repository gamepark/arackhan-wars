import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Gabriel extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Gabriel
  value = 10
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
