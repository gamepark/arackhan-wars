import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class IceProtector extends Creature {
  faction = Faction.Whitelands
  value = 2

  attack = 0
  defense = 2
}
