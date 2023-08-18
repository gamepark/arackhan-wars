import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { initiative } from '../Attribute'

export class PaladinOfTheGuard extends Creature {
  faction = Faction.Whitelands
  value = 8

  family = Family.IceGuard
  attack = 2
  defense = 2

  attribute = initiative
}
