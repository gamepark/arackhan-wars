import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { adjacent, creature, enemy } from '../utils/applicable-filter.utils'
import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { looseSkills } from '../../rules/effect/LooseSkillsEffect'
import { attack } from '../base/Ability'

export class Firestorm extends Spell {
  faction = Faction.Blight
  limit = 2
  value = 3

  effects = [
    attack(-1).defense(-1).to(adjacent, enemy, creature),
    looseAttributes([adjacent, enemy, creature]),
    looseSkills([adjacent, enemy, creature])
  ]
}
