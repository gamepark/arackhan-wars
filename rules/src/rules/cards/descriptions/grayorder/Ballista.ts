import { rangedAttack } from '../../rules/attribute'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Ballista extends Creature {
  faction = Faction.GrayOrder
  value = 5

  family = 'artillery'
  attack = 1
  defense = 1

  attribute = rangedAttack(3)
}
