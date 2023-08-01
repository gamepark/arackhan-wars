import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { perforation } from '../../rules/attribute'

export class IceGolem extends Creature {
  faction = Faction.Whitelands
  value = 13
  deckBuildingValue = 15

  attack = 3
  defense = 3

  attribute = perforation
}
