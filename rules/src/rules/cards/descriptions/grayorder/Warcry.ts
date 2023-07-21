import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { DiscardTiming } from '../base/FactionCardDetail'

export class Warcry extends Spell {
  id = FactionCard.Warcry
  faction = Faction.GrayOrder
  family = '6th-legion'

  value = 2
  astral = true

  effect = valueModifier([allied, family(this.family), creature], { attack: +1 })

  discardTiming = DiscardTiming.EndOfRound
}
