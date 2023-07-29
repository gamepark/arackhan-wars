import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'

export class ShieldOfDown extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.ChildrenOfDawn
  attack = 1
  defense = 2

  skill = valueModifier([adjacent, allied, creature], { defense: +1 })
}
