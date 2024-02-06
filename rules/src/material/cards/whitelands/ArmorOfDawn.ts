import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class ArmorOfDawn extends Spell {
  faction = Faction.Whitelands
  value = 5
  holo = true

  astral = true

  attribute = initiative

  //TODO effect
}
