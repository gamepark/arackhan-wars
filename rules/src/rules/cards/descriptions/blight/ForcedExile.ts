import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { RuleId } from '../../../RuleId'
import { initiative } from '../base/Attribute'

export class ForcedExile extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 6

  astral = true

  attribute = initiative

  action = RuleId.ForcedExileActionRule
}
