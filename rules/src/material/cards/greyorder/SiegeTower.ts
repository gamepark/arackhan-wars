import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { perforation } from '../Attribute'

export class SiegeTower extends Creature {
  faction = Faction.GreyOrder
  value = 10

  attack = 4
  defense = 1

  attribute = perforation
}
