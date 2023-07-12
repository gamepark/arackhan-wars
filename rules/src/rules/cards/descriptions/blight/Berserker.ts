import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Berserker extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Berserker
  value = 4
  attack = 1
  defense = 1
  quantity = 2
  attributes = [
    { type: CardAttributeType.Initiative },
    { type: CardAttributeType.Omnistrike }
  ]
}
