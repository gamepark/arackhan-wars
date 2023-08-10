import { adjacent, allied, creature, enemy } from '../base/AbilityTargetFilter'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { loseAttributes } from '../base/Ability'

export class PlagueCollector extends Creature {
  faction = Faction.Blight
  value = 6

  attack = 1
  defense = 2

  skill = loseAttributes().to(adjacent, enemy, creature)
  weakness = loseAttributes().to(adjacent, allied, creature)
}
