import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class ChildEater extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.ChildEater
  value = 13
  attack = 4
  defense = 2
  attributes = [{ type: CardAttributeType.Perforation }]
}
