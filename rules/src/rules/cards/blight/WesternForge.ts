import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class WesternForge extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Land
  defense = 4
}
