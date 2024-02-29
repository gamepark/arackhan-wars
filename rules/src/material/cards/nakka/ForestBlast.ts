import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { initiative } from '../Attribute'
import { Spell } from '../Spell'

export class ForestBlast extends Spell {
  faction = Faction.Nakka
  value = 2

  astral = true

  attribute = initiative
  action = RuleId.DiscardEnemySpellAction
}
