import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { adjacent, creature, enemy } from '../base/AbilityTargetFilter'
import { deactivate } from '../base/Ability'

export class TheFear extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 5

  effect = deactivate(adjacent, enemy, creature)
}
