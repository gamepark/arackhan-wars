import { Faction } from '../../Faction'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Catapult extends Creature {
  faction = Faction.GreyOrder
  value = 6
  deckBuildingValue = 8

  family = Family.Artillery
  attack = 2
  defense = 1

  attribute = rangedAttack(3)
}
