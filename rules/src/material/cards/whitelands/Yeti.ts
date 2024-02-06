import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class Yeti extends Creature {
  faction = Faction.Whitelands
  value = 3

  attack = 1
  defense = 2
}
