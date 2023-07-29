import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { Family } from '../base/Family'

export class Warcry extends Spell {
  faction = Faction.GrayOrder
  value = 2

  astral = true

  effect = valueModifier([allied, family(Family.SixthLegion), creature], { attack: +1 })
}
