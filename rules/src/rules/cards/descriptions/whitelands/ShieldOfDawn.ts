import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'
import { defense } from '../base/Ability'

export class ShieldOfDawn extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.ChildrenOfDawn
  attack = 1
  defense = 2

  skill = defense(+1).to(adjacent, allied, creature)
}
