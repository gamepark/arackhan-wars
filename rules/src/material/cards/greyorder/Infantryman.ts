import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { attack } from '../Ability'

export class Infantryman extends Creature {
  faction = Faction.GreyOrder
  value = 3

  family = Family.SixthLegion
  attack = 1
  defense = 1

  skill = attack(+1).to(adjacent, allied, family(Family.SixthLegion), creature)
}
