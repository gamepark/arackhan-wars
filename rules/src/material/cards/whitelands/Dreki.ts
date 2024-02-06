import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { flight } from '../Attribute'

export class Dreki extends Creature {
  faction = Faction.Whitelands
  value = 5

  attack = 1
  defense = 1

  attribute = flight
}
