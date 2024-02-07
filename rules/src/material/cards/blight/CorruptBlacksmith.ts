import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class CorruptBlacksmith extends Creature {
  faction = Faction.Blight
  value = 3

  family = Family.Blacksmith
  attack = 1
  defense = 1

  skill = attack(+1).to(adjacent, allied, creature)
}
