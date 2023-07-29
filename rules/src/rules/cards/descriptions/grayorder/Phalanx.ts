import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class Phalanx extends Creature {
  faction = Faction.GrayOrder
  value = 3

  family = '6th-legion'
  attack = 1
  defense = 1

  skill = valueModifier([adjacent, allied, family(this.family), creature], { defense: +1 })
}
