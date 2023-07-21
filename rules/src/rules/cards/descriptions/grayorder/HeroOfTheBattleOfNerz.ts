import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class HeroOfTheBattleOfNerz extends Creature {
  id = FactionCard.HeroOfTheBattleOfNerz
  faction = Faction.GrayOrder

  value = 10
  attack = 2
  defense = 3

  skill = valueModifier([adjacent, allied, creature], { defense: +1 })
}
