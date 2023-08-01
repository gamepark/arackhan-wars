import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'

export class AvalonFortress extends Land {
  faction = Faction.GreyOrder
  value = 10

  defense = 4

  benefit = valueModifier([adjacent, allied, creature], { attack: +1, defense: +1 })
}
