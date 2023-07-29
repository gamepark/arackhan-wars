import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, land, or } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'

export class WinterProtects extends Spell {
  faction = Faction.Whitelands
  value = 4

  effect = valueModifier([adjacent, allied, or(creature, land)], { defense: +2 })
}
