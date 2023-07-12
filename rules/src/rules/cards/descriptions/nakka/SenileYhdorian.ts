import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class SenileYhdorian extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.SenileYhdorian
  value = 5
  attack = 1
  defense = 3
  quantity = 2
}
