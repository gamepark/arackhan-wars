import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class HorseOfAvalon extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Spell
}
