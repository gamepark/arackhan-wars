import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Titan extends Creature {
  faction = Faction.GreyOrder
  value = 13
  deckBuildingValue = 16
  limit = 4

  family = Family.Legion6
  attack = 3
  defense = 3

  skill = attack(+1).defense(+1).to(adjacent, allied, family(Family.Legion6), creature)
}
