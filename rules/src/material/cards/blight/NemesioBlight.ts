import { Faction } from '../../Faction'
import { movement, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class NemesioBlight extends Creature {
  faction = Faction.Blight
  legendary = true
  value = 5
  deckBuildingValue = 15
  fullArt = true

  attack = 1
  defense = 0

  attributes = [stealth, movement(2)]
  //TODO action
}
