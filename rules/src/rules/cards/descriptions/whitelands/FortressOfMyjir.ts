import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'

export class FortressOfMyjir extends Land {
  id = FactionCard.FortressOfMyjir
  faction = Faction.Whitelands

  value = 10
  defense = 4

  benefit = valueModifier([adjacent, allied, creature], { defense: +2 })
}
