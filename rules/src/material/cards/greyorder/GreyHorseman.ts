import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { movement } from '../Attribute'

export class GreyHorseman extends Creature {
  faction = Faction.GreyOrder
  value = 7
  deckBuildingValue = 9

  attack = 2
  defense = 2

  attribute = movement(2)
}
