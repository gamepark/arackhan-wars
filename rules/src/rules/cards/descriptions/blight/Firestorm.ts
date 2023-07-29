import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, creature, enemy } from '../utils/applicable-filter.utils'
import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { looseSkills } from '../../rules/effect/LooseSkillsEffect'

export class Firestorm extends Spell {
  id = FactionCard.Firestorm
  faction = Faction.Blight

  value = 3

  effects = [
    valueModifier([adjacent, enemy, creature], { attack: -1, defense: -1 }),
    looseAttributes([adjacent, enemy, creature]),
    looseSkills([adjacent, enemy, creature])
  ]

  quantity = 2
}
