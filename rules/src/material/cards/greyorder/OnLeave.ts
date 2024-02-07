import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class OnLeave extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  attribute = initiative
  // TODO action
}
