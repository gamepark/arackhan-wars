import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { perforation } from '../Attribute'

export class IceGolem extends Creature {
  faction = Faction.Whitelands
  value = 13
  deckBuildingValue = 15

  attack = 3
  defense = 3

  attribute = perforation
}
