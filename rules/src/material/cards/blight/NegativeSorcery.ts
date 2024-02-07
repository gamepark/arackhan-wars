import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class NegativeSorcery extends Spell {
  faction = Faction.Blight
  value = 2

  astral = true

  attribute = initiative

  // TODO action
}
