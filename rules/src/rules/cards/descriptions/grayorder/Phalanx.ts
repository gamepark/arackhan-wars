import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class Phalanx extends Creature {
  id = FactionCard.Phalanx
  faction = Faction.GrayOrder
  family = '6th-legion'

  value = 3
  attack = 1
  defense = 1

  skill = valueModifier([adjacent, allied, family(this.family), creature], { defense: +1 })

  quantity = 3
}
