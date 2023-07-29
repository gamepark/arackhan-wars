import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'

export class Infantryman extends Creature {
  faction = Faction.GreyOrder
  value = 3

  family = Family.SixthLegion
  attack = 1
  defense = 1

  skill = valueModifier([adjacent, allied, family(Family.SixthLegion), creature], { attack: +1 })
}
