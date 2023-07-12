import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class TreeOfLife extends NakkaCard {
  kind = FactionCardKind.Land
  id = FactionCard.TreeOfLife
  value = 12
  defense = 4
}
