import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GreyPriest extends Creature {
  faction = Faction.GreyOrder
  value = 8

  family = Family.Legion6
  attack = 1
  defense = 1

  // TODO skills
}
