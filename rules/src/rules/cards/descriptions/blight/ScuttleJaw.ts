import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class ScuttleJaw extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.ScuttleJaw
  value = 1
  attack = 1
  defense = 0
}
