import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class PaladinOfTheGuard extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.PaladinOfTheGuard
  value = 8
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
