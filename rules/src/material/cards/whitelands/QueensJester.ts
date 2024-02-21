import { Faction } from '../../Faction'
import { invertsAttackDefense } from '../Ability'
import { adjacent, creature, enemy } from '../AbilityTargetFilter'
import { stealth } from '../Attribute'
import { Creature } from '../Creature'

export class QueensJester extends Creature {
  faction = Faction.Whitelands
  value = 6

  attack = 1
  defense = 0

  attribute = stealth
  skill = invertsAttackDefense().to(adjacent, enemy, creature)
}
