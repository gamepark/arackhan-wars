import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { RuleId } from '../../../rules/RuleId'

export class HorseOfAvalon extends Spell {
  faction = Faction.GreyOrder
  limit = 2
  value = 7

  action = RuleId.HorseOfAvalonActionRule
}
