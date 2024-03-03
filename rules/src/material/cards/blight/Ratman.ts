import { Faction } from '../../Faction'
import { swarmSameCard } from '../Ability'
import { swarm } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Ratman extends Creature {
  faction = Faction.Blight
  value = 2

  family = Family.Rat
  attack = 0
  defense = 1

  attribute = swarm
  weakness = swarmSameCard()
}
