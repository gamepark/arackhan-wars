import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { initiative } from '../../rules/attribute'
import { Family } from '../base/Family'

export class Gabriel extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 10

  family = Family.IceGuard
  attack = 3
  defense = 2

  attribute = initiative
}
