import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class EssenceAbsorption extends Spell {
  faction = Faction.Blight
  value = 3

  astral = true

  attribute = initiative

  action = RuleId.EssenceAbsorptionAction
}
