import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class DeathCrawler extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.DeathCrawler
  attack = 2
}
