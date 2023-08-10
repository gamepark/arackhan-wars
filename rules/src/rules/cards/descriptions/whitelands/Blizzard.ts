import { creature, enemy } from '../base/AbilityTargetFilter'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { loseAttributes } from '../base/Ability'

export class Blizzard extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 6

  astral = true

  effect = loseAttributes().loseSkills().to(enemy, creature)
}
