import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class FireLightning extends BlightCard {
  kind = FactionCardKind.Spell
  id = FactionCard.FireLightning
  value = 2
  attack = 2
  attributes = [
    { type: CardAttributeType.RangeAttack, strength: 3 }
  ]
  quantity = 2
}
