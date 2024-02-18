import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class MarchingOrder extends Spell {
  faction = Faction.GreyOrder
  value = 6

  astral = true

  action = RuleId.MarchingOrderAction
}
