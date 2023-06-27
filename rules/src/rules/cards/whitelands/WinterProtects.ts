import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class WinterProtects extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Spell
  quantity = 2
}
