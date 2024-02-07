import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class TheFog extends Spell {
  faction = Faction.Blight
  value = 3

  astral = true

  // TODO effect
}
