import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { RuleId } from '../../../rules/RuleId'
import { initiative } from '../Attribute'

export class ForcedExile extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 6

  astral = true

  attribute = initiative

  action = RuleId.ForcedExileActionRule
}
