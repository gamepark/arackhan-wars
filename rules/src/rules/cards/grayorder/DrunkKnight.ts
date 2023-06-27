import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class DrunkKnight extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 4
}
