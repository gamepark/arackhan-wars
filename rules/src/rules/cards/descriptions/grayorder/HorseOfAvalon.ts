import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class HorseOfAvalon extends GrayOrderCard {
  kind = FactionCardKind.Spell
  id = FactionCard.HorseOfAvalon
  value = 7
}
