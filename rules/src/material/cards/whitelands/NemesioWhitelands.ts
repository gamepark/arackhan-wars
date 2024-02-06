import { Faction } from '../../Faction'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class NemesioWhitelands extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 2
  deckBuildingValue = 8
  fullArt = true

  attack = 0
  defense = 1

  attribute = movement(2)
  // TODO: skill & action
}
