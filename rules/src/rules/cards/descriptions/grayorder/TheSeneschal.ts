import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class TheSeneschal extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.TheSeneschal
  value = 14
  attack = 4
  defense = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
