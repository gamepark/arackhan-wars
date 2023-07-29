import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class IcePaladin extends Creature {
  faction = Faction.Whitelands
  value = 5

  attack = 2
  defense = 2
}
