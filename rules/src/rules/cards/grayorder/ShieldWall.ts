import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class ShieldWall extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Spell
  astral = true
}
