import { Faction } from '../../Faction'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class Lucy extends Creature {
  faction = Faction.Blight
  legendary = true
  value = 7

  attack = 0
  defense = 0

  attributes = [stealth, flight]
  //TODO skills
}
