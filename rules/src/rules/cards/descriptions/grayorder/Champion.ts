import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature, family } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Champion extends Creature {
  id = FactionCard.Champion
  faction = Faction.GrayOrder
  family = '6th-legion'

  value = 8
  attack = 2
  defense = 2

  skill = valueModifier([adjacent, allied, family(this.family), creature], { attack: +1, defense: +1 })

  quantity = 2
}
