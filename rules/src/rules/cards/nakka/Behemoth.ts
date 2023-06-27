import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Behemoth extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
}
