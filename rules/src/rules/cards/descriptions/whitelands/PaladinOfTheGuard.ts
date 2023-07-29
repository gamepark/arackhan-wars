import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { initiative } from '../../rules/attribute'
import { Family } from '../base/Family'

export class PaladinOfTheGuard extends Creature {
  faction = Faction.Whitelands
  value = 8

  family = Family.IceGuard
  attack = 2
  defense = 2

  attribute = initiative
}
