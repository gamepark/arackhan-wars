import { Faction } from '../../Faction'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class NoviceFairy extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 5

  family = Family.IceFairy
  attack = 0
  defense = 0

  attributes = [stealth, flight]
  // TODO action
}
