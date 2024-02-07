import { Faction } from '../../Faction'
import { loseAttributes } from '../Ability'
import { adjacent, creature, enemy } from '../AbilityTargetFilter'
import { AttributeType, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class CrawlingRoots extends Creature {
  faction = Faction.Nakka
  value = 5

  attack = 1
  defense = 0

  attribute = stealth
  skill = loseAttributes(AttributeType.Flight, AttributeType.Movement).to(adjacent, enemy, creature)
}
