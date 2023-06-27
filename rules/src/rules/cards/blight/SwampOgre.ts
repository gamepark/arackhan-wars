import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class SwampOgre extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  quantity = 2
}
