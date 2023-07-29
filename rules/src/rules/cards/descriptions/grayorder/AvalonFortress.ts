import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'

export class AvalonFortress extends Land {
  id = FactionCard.AvalonFortress
  faction = Faction.GrayOrder
  legendary = true
  value = 10

  defense = 4

  benefit = valueModifier([adjacent, allied, creature], { attack: +1, defense: +1 })
}
