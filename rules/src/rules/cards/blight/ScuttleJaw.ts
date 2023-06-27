import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class ScuttleJaw extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 1
}
