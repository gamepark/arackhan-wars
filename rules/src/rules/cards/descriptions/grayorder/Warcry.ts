import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'

export class Warcry extends Spell {
  faction = Faction.GrayOrder
  value = 2

  family = '6th-legion'
  astral = true

  effect = valueModifier([allied, family(this.family), creature], { attack: +1 })
}
