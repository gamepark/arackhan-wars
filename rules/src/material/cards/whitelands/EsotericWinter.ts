import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class EsotericWinter extends Spell {
  faction = Faction.Whitelands
  value = 2

  astral = true

  attribute = initiative
  action = RuleId.DiscardEnemySpellAction
}
