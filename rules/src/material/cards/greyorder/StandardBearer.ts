import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class StandardBearer extends Creature {
  faction = Faction.GreyOrder
  value = 7

  family = Family.Legion6
  attack = 1
  defense = 1

  // TODO action
}
