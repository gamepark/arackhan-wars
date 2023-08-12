import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'
import { initiative } from '../base/Attribute'

export class Banshee extends Creature {
  faction = Faction.Nakka
  value = 6

  family = Family.Sentinel
  attack = 2
  defense = 1

  attribute = initiative
}
