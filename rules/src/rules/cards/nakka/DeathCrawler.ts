import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class DeathCrawler extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 2
}
