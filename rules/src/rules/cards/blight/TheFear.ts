import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class TheFear extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Spell
}
