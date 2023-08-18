import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { defense } from '../Ability'

export class ShieldOfDawn extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.ChildrenOfDawn
  attack = 1
  defense = 2

  skill = defense(+1).to(adjacent, allied, creature)
}
