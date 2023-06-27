import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class AvalonFortress extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Land
  defense = 4
}
