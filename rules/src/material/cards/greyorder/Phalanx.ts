import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { defense } from '../Ability'

export class Phalanx extends Creature {
  faction = Faction.GreyOrder
  value = 3

  family = Family.Legion6
  attack = 1
  defense = 1

  skill = defense(+1).to(adjacent, allied, family(Family.Legion6), creature)
}
