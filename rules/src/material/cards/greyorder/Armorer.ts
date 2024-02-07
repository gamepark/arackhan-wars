import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Creature } from '../Creature'

export class Armorer extends Creature {
  faction = Faction.GreyOrder
  value = 7

  attack = 1
  defense = 1

  skill = attack(+1).defense(+1).to(adjacent, allied, creature)
}
