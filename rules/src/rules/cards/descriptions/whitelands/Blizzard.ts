import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { creature, enemy } from '../utils/applicable-filter.utils'
import { looseSkills } from '../../rules/effect/LooseSkillsEffect'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'

export class Blizzard extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 6

  astral = true

  effects = [
    looseAttributes([enemy, creature]),
    looseSkills([enemy, creature])
  ]
}
