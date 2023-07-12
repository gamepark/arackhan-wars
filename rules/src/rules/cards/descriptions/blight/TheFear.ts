import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class TheFear extends BlightCard {
  kind = FactionCardKind.Spell
  id = FactionCard.TheFear
  value = 5
}
