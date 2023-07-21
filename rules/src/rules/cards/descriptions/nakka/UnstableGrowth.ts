import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'

export class UnstableGrowth extends Spell {
  id = FactionCard.UnstableGrowth
  faction = Faction.Nakka

  value = 2

  effect = valueModifier([adjacent, allied, creature], { attack: +2, defense: -1 })

  discardTiming = DiscardTiming.EndOfRound
}
