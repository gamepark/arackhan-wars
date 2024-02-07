import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Archer extends Creature {
  faction = Faction.GreyOrder
  value = 5
  fullArt = true

  family = Family.Legion4
  attack = 1
  defense = 1

  attribute = rangedAttack(2)
  skill = attack(+1).to(adjacent, allied, family(Family.Legion4), creature)
}
