import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class ArmouredConvoy extends Spell {
  faction = Faction.GreyOrder
  value = 3

  astral = true

  action = RuleId.ArmouredConvoyAction
}
