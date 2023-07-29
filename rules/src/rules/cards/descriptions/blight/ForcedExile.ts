import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { initiative } from '../../rules/attribute'
import { RuleId } from '../../../RuleId'

export class ForcedExile extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 6

  astral = true

  attribute = initiative

  actionRule = RuleId.ForcedExileActionRule
}
