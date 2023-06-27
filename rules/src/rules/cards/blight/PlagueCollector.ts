import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class PlagueCollector extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 1
  defense = 2
  quantity = 2
}
