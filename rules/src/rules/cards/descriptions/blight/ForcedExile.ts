import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class ForcedExile extends BlightCard {
  kind = FactionCardKind.Spell
  id = FactionCard.ForcedExile
  value = 6
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
