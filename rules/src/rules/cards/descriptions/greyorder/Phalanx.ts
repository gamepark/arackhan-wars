import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'

export class Phalanx extends Creature {
  faction = Faction.GreyOrder
  value = 3

  family = Family.SixthLegion
  attack = 1
  defense = 1

  skill = valueModifier([adjacent, allied, family(Family.SixthLegion), creature], { defense: +1 })
}
