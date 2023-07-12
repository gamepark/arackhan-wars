import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class IceGolem extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.IceGolem
  value = 13
  attack = 3
  defense = 3
  attributes = [{ type: CardAttributeType.Perforation }]
}
