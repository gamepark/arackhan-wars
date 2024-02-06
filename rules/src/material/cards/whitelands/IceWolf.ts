import { Faction } from '../../Faction'
import { swarm } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class IceWolf extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.IceFangs
  attack = 1
  defense = 1

  attribute = swarm
}
