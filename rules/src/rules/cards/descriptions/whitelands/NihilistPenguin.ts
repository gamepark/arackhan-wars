import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class NihilistPenguin extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.NihilistPenguin
  value = 1
  attack = 0
  defense = 1
  attributes = [{
    type: CardAttributeType.Movement,
    strength: 2
  }]
  quantity = 4
}
