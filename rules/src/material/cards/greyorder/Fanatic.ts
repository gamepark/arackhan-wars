import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Creature } from '../Creature'

export class Fanatic extends Creature {
  faction = Faction.GreyOrder
  value = 4

  attack = 2
  defense = 0

  attribute = initiative
}
