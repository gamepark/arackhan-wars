import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class IceElemental extends Creature {
  faction = Faction.Whitelands
  value = 6

  family = Family.Elemental
  attack = 1
  defense = 2

  // TODO skill & action
}
