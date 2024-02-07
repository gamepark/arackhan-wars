import { Faction } from '../../Faction'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Huntress extends Creature {
  faction = Faction.Nakka
  limit = 4
  value = 7

  family = Family.Sentinel
  attack = 1
  defense = 1

  attribute = rangedAttack(4)
}
