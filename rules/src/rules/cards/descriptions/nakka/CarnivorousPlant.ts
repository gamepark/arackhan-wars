import { FactionCard } from '../../../../material/FactionCard'
import { onlyAttackedByGroup } from '../../rules/effect/OnlyAttackedByGroup'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class CarnivorousPlant extends Creature {
  id = FactionCard.CarnivorousPlant
  faction = Faction.Nakka

  value = 6
  attack = 1
  defense = 1

  skills = [
    valueModifier([adjacent, allied, creature], { defense: +1 }),
    onlyAttackedByGroup
  ]

  quantity = 2
}
