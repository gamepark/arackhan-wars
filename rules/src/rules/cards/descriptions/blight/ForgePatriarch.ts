import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class ForgePatriarch extends Creature {
  faction = Faction.Blight
  value = 7

  attack = 2
  defense = 2

  skill = valueModifier([adjacent, allied, creature], { attack: +1 })
}
