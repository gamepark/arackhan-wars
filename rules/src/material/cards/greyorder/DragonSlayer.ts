import { Faction } from '../../Faction'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'

export class DragonSlayer extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 13

  attack = 1
  defense = 2

  attribute = rangedAttack(3)
  // TODO skill
}
