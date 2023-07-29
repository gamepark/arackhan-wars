import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { perforation } from '../../rules/attribute'

export class SiegeTower extends Creature {
  faction = Faction.GreyOrder
  value = 10

  attack = 4
  defense = 1

  attribute = perforation
}
