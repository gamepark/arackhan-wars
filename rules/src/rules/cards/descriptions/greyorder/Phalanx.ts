import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'
import { defense } from '../base/Ability'

export class Phalanx extends Creature {
  faction = Faction.GreyOrder
  value = 3

  family = Family.SixthLegion
  attack = 1
  defense = 1

  skill = defense(+1).to(adjacent, allied, family(Family.SixthLegion), creature)
}
