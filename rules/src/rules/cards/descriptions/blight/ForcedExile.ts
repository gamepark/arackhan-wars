import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { initiative } from '../../rules/attribute'
import { RuleId } from '../../../RuleId'

export class ForcedExile extends Spell {
  id = FactionCard.ForcedExile
  faction = Faction.Blight

  value = 6
  astral = true

  attribute = initiative

  actionRule = RuleId.ForcedExileActionRule

  discardTiming = DiscardTiming.ActivationOrEndOfTurn
}
