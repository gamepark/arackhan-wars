import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'
import { attack } from '../base/Ability'

export class ForgePatriarch extends Creature {
  faction = Faction.Blight
  value = 7

  family = Family.Blacksmith
  attack = 2
  defense = 2

  skill = attack(+1).to(adjacent, allied, creature)
}
