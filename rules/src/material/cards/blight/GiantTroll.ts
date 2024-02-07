import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GiantTroll extends Creature {
  faction = Faction.Blight
  value = 8

  family = Family.Troll
  attack = 3
  defense = 2

  // TODO: skill & weakness
}
