import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { RuleId } from '../../../RuleId'

export class Mimicry extends Spell {
  id = FactionCard.Mimicry
  faction = Faction.Nakka

  value = 3
  astral = true

  actionRule = RuleId.MimicryActionRule

  discardTiming = DiscardTiming.ActivationOrEndOfTurn
}
