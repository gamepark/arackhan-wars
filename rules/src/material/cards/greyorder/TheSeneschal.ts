import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { omnistrike } from '../Attribute'

export class TheSeneschal extends Creature {
  faction = Faction.GreyOrder
  legendary = true
  value = 14
  deckBuildingValue = 16

  attack = 4
  defense = 2

  attribute = omnistrike
}
