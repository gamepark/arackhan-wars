import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Land } from '../base/Land'

export class WesternForge extends Land {
  id = FactionCard.WesternForge
  faction = Faction.Blight
  legendary = true
  value = 10

  defense = 4

  benefit = valueModifier([adjacent, allied, creature], { attack: +2 })
}
