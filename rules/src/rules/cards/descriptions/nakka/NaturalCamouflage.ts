import { FactionCard } from '../../../../material/FactionCard'
import { cantBeAttacked } from '../../rules/effect/CantBeAttackedEffect'
import { adjacent, allied, creature, land, or } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { DiscardTiming } from '../base/FactionCardDetail'

export class NaturalCamouflage extends Spell {
  id = FactionCard.NaturalCamouflage
  faction = Faction.Nakka

  value = 3

  skill = cantBeAttacked([adjacent, allied, or(creature, land)])

  discardTiming = DiscardTiming.EndOfRound
}
