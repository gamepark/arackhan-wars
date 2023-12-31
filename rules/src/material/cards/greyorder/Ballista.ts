import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { rangedAttack } from '../Attribute'

export class Ballista extends Creature {
  faction = Faction.GreyOrder
  value = 5

  family = Family.Artillery
  attack = 1
  defense = 1

  attribute = rangedAttack(3)
}
