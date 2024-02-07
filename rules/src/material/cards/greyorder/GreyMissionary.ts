import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GreyMissionary extends Creature {
  faction = Faction.GreyOrder
  value = 8

  family = Family.Legion6
  attack = 2
  defense = 2

  // TODO skills
}
