import { Creature } from '../Creature'
import { Faction } from '../../Faction'

export class Behemoth extends Creature {
  faction = Faction.Nakka
  value = 8

  attack = 3
  defense = 2
}
