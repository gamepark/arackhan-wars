import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class SoberKnight extends Creature {
  faction = Faction.GreyOrder
  value = 2

  attack = 1
  defense = 1
}
