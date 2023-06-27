import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class TreeOfLife extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Land
  defense = 4
}
