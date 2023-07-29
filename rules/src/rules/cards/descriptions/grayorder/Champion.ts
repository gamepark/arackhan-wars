import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Champion extends Creature {
  faction = Faction.GrayOrder
  limit = 4
  value = 8

  family = '6th-legion'
  attack = 2
  defense = 2

  skill = valueModifier([adjacent, allied, family(this.family), creature], { attack: +1, defense: +1 })
}
