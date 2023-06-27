import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class SwampTroll extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  quantity = 3
}
