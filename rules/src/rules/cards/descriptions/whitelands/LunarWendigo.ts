import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class LunarWendigo extends Creature {
  faction = Faction.Whitelands
  value = 3

  attack = 1
  defense = 2
}
