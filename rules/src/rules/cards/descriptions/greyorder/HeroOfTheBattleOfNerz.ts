import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { defense } from '../base/Ability'

export class HeroOfTheBattleOfNerz extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 12

  attack = 2
  defense = 3

  skill = defense(+1).to(adjacent, allied, creature)
}
