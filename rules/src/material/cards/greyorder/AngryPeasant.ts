import { Faction } from '../../Faction'
import { swarm } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class AngryPeasant extends Creature {
  faction = Faction.GreyOrder
  value = 2

  family = Family.Peasant
  attack = 0
  defense = 1

  attribute = swarm
}
