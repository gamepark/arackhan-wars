import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { flight } from '../../rules/attribute'

export class Eagle extends Creature {
  faction = Faction.Whitelands
  value = 5

  attack = 1
  defense = 1

  attribute = flight
}
