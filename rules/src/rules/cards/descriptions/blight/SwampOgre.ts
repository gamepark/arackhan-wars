import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class SwampOgre extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.SwampOgre
  value = 3
  attack = 2
  defense = 1
  quantity = 2
}
