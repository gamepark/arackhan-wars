import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class IceMoleg extends Creature {
  faction = Faction.Whitelands
  value = 8

  attack = 2
  defense = 3
}
