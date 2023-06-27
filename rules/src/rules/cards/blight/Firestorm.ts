import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Firestorm extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Spell
  quantity = 2
}
