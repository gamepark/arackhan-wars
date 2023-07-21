import { FactionCard } from '../../../../material/FactionCard'
import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { creature, enemy } from '../utils/applicable-filter.utils'
import { looseSkills } from '../../rules/effect/LooseSkillsEffect'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { DiscardTiming } from '../base/FactionCardDetail'

export class Blizzard extends Spell {
  id = FactionCard.Blizzard
  faction = Faction.Whitelands

  value = 6
  astral = true

  effects = [
    looseAttributes([enemy, creature]),
    looseSkills([enemy, creature])
  ]

  discardTiming = DiscardTiming.EndOfRound
}
