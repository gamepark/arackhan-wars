import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class FortressOfMyjir extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Land
  defense = 4
}
