import { Faction } from '../../Faction'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Adrielle extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 5
  deckBuildingValue = 13
  fullArt = true

  family = Family.IceFairy
  attack = 0
  defense = 0

  attributes = [stealth, flight]
  // TODO action
}
