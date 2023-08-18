import { creature, enemy } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { loseAttributes } from '../Ability'

export class Blizzard extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 6

  astral = true

  effect = loseAttributes().loseSkills().to(enemy, creature)
}
