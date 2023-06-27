import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Blizzard extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Spell
  astral = true
}
