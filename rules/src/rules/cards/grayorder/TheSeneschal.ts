import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class TheSeneschal extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Creature
  attack = 4
  defense = 2
}
