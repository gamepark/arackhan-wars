import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class Truce extends Spell {
  faction = Faction.GreyOrder
  value = 4
  limit = 2

  // TODO effect
}
