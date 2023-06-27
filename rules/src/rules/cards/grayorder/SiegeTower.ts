import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class SiegeTower extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Creature
  attack = 4
  defense = 1
}
