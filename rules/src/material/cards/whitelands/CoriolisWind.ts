import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class CoriolisWind extends Spell {
  faction = Faction.Whitelands
  value = 3

  action = RuleId.CoriolisWindAction
}
