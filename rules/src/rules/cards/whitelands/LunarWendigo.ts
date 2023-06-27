import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class LunarWendigo extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 1
  defense = 2
  quantity = 2
}
