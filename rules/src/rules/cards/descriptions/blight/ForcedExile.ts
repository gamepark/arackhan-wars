import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { initiative } from '../../rules/attribute'

export class ForcedExile extends Spell {
  id = FactionCard.ForcedExile
  faction = Faction.Blight

  value = 6
  astral = true

  attribute = initiative

  discardTiming = DiscardTiming.ActivationOrEndOfTurn
}
