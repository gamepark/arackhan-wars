import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class PlagueCollector extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.PlagueCollector
  value = 6
  attack = 1
  defense = 2
  quantity = 2
}
