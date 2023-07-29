import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { RuleId } from '../../../RuleId'

export class HorseOfAvalon extends Spell {
  faction = Faction.GreyOrder
  limit = 2
  value = 7

  action = RuleId.HorseOfAvalonActionRule
}
