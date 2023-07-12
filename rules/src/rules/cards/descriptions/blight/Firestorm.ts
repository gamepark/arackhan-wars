import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Firestorm extends BlightCard {
  kind = FactionCardKind.Spell
  id = FactionCard.Firestorm
  value = 3
  quantity = 2
}
