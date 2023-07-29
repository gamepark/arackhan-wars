import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Infantryman extends Creature {
  id = FactionCard.Infantryman
  faction = Faction.GrayOrder
  family = '6th-legion'

  value = 3
  attack = 1
  defense = 1
  
  skill = valueModifier([adjacent, allied, family(this.family), creature], { attack: +1 })
}
