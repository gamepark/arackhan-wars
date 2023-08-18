import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { initiative } from '../Attribute'

export class Banshee extends Creature {
  faction = Faction.Nakka
  value = 6

  family = Family.Sentinel
  attack = 2
  defense = 1

  attribute = initiative
}
