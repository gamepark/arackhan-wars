import { Faction } from '../../Faction'
import { flight } from '../Attribute'
import { Creature } from '../Creature'

export class ScorpionFly extends Creature {
  faction = Faction.Blight
  value = 3

  attack = 1
  defense = 0

  attribute = flight
}
