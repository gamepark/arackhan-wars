import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class ScuttleJaw extends Creature {
  faction = Faction.Blight
  value = 1

  attack = 1
  defense = 0
}
