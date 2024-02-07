import { Faction } from '../../Faction'
import { flight, initiative } from '../Attribute'
import { Creature } from '../Creature'

export class LightningBird extends Creature {
  faction = Faction.Nakka
  value = 2

  attack = 0
  defense = 0

  attributes = [initiative, flight]
}
