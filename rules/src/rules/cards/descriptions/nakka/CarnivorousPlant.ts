import { onlyAttackedByGroup } from '../../rules/effect/OnlyAttackedByGroup'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class CarnivorousPlant extends Creature {
  faction = Faction.Nakka
  value = 6

  attack = 1
  defense = 1

  skills = [
    valueModifier([adjacent, allied, creature], { defense: +1 }),
    onlyAttackedByGroup
  ]
}
