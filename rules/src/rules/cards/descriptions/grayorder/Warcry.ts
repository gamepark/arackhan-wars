import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Warcry extends GrayOrderCard {
  kind = FactionCardKind.Spell
  id = FactionCard.Warcry
  value = 2
  astral = true
}
