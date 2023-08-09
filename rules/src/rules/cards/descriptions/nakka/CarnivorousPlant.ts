import { onlyAttackedByGroup } from '../../rules/effect/OnlyAttackedByGroup'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { defense } from '../base/Ability'

export class CarnivorousPlant extends Creature {
  faction = Faction.Nakka
  value = 6

  attack = 1
  defense = 1

  skills = [
    defense(+1).to(adjacent, allied, creature),
    onlyAttackedByGroup
  ]
}
