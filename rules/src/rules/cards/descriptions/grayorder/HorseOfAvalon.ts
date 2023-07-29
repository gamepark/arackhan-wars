import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { RuleId } from '../../../RuleId'

export class HorseOfAvalon extends Spell {
  faction = Faction.GrayOrder
  limit = 2
  value = 7

  actionRule = RuleId.HorseOfAvalonActionRule
}
