import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class NakkaArcher extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.NakkaArcher
  value = 3
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 2 }]
  quantity = 3
}
