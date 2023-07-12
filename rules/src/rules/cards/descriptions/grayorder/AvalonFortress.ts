import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class AvalonFortress extends GrayOrderCard {
  kind = FactionCardKind.Land
  id = FactionCard.AvalonFortress
  value = 10
  defense = 4
}
