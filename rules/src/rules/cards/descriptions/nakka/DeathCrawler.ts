import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class DeathCrawler extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.DeathCrawler
  value = 2
  attack = 2
  defense = 0
}
