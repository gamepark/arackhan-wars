import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class SwampTroll extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.SwampTroll
  value = 4
  attack = 2
  defense = 1
  quantity = 3
}
