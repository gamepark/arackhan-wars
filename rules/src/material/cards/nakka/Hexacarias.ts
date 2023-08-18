import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class Hexacarias extends Creature {
  faction = Faction.Nakka
  value = 5

  attack = 2
  defense = 2
}
