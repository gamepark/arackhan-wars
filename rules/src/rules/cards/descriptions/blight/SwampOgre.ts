import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class SwampOgre extends Creature {
  faction = Faction.Blight
  value = 3

  attack = 2
  defense = 1
}
