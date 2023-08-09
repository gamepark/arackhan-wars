import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { adjacent, creature, enemy } from '../utils/applicable-filter.utils'
import { deactivate } from '../base/Ability'

export class TheFear extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 5

  effect = deactivate(adjacent, enemy, creature)
}
