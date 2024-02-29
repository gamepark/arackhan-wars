import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Creature } from '../Creature'

export class Assassin extends Creature {
  faction = Faction.GreyOrder
  value = 8
  deckBuildingValue = 13
  limit = 3

  attack = 2
  defense = 1

  attribute = initiative
  action = RuleId.AssassinAction
}
