import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { rangedAttack } from '../Attribute'

export class Catanolith extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 15
  holo = true

  family = Family.Artillery
  attack = 3
  defense = 1

  attribute = rangedAttack(3)
  // TODO skills
}
