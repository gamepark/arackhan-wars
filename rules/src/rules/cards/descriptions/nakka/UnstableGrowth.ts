import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class UnstableGrowth extends NakkaCard {
  kind = FactionCardKind.Spell
  id = FactionCard.UnstableGrowth
  value = 2
}
