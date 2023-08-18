import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { adjacent, creature, enemy } from '../AbilityTargetFilter'
import { deactivate } from '../Ability'

export class TheFear extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 5

  effect = deactivate(adjacent, enemy, creature)
}
