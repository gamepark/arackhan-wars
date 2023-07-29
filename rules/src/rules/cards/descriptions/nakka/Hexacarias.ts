import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class Hexacarias extends Creature {
  faction = Faction.Nakka
  value = 5

  attack = 2
  defense = 2
}
