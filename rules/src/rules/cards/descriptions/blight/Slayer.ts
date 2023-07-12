import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Slayer extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Slayer
  value = 7
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
