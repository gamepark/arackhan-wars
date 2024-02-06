import { Faction } from '../../Faction'
import { stealth } from '../Attribute'
import { Creature } from '../Creature'

export class QueensJester extends Creature {
  faction = Faction.Whitelands
  value = 6

  attack = 1
  defense = 0

  attribute = stealth
  // TODO skill
}
