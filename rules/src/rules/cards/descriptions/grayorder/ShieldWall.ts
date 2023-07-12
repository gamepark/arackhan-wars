import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'
import { FactionCardKind } from '../FactionCardDetail'

export class ShieldWall extends GrayOrderCard {
  kind = FactionCardKind.Spell
  id = FactionCard.ShieldWall
  value = 2
  astral = true
}
