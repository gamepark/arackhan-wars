import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class DeathCrawler extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 2
}
