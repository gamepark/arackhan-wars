import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { attack } from '../Ability'

export class ForgePatriarch extends Creature {
  faction = Faction.Blight
  value = 7

  family = Family.Blacksmith
  attack = 2
  defense = 2

  skill = attack(+1).to(adjacent, allied, creature)
}
