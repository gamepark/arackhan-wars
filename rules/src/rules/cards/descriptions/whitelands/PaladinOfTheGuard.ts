import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { initiative } from '../../rules/attribute'

export class PaladinOfTheGuard extends Creature {
  faction = Faction.Whitelands
  value = 8

  attack = 2
  defense = 2

  attribute = initiative
}
