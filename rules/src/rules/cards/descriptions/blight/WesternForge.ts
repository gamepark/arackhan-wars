import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class WesternForge extends BlightCard {
  kind = FactionCardKind.Land
  id = FactionCard.WesternForge
  value = 10
  defense = 4
}
