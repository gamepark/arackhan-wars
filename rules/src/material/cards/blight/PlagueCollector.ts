import { adjacent, allied, creature, enemy } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { loseAttributes } from '../Ability'

export class PlagueCollector extends Creature {
  faction = Faction.Blight
  value = 6

  attack = 1
  defense = 2

  skill = loseAttributes().to(adjacent, enemy, creature)
  weakness = loseAttributes().to(adjacent, allied, creature)
}
