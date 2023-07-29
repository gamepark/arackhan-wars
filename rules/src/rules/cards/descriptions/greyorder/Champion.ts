import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'

export class Champion extends Creature {
  faction = Faction.GreyOrder
  limit = 4
  value = 8

  family = Family.SixthLegion
  attack = 2
  defense = 2

  skill = valueModifier([adjacent, allied, family(Family.SixthLegion), creature], { attack: +1, defense: +1 })
}
