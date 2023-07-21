import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class ShieldOfDown extends Creature {
  id = FactionCard.ShieldOfDawn
  faction = Faction.Whitelands

  value = 5
  attack = 1
  defense = 2

  skill = valueModifier([adjacent, allied, creature], { defense: +1 })

  quantity = 3
}