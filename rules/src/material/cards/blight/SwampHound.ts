import { Faction } from '../../Faction'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class SwampHound extends Creature {
  faction = Faction.Blight
  value = 6

  attack = 2
  defense = 1

  attribute = movement(2)
}
