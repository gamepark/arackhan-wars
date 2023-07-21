import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, land, or } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'

export class WinterProtects extends Spell {
  id = FactionCard.WinterProtects
  faction = Faction.Whitelands

  value = 4
  quantity = 2

  effect = valueModifier([adjacent, allied, or(creature, land)], { defense: +2 })

  discardTiming = DiscardTiming.EndOfRound
}