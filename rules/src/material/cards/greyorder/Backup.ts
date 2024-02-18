import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class Backup extends Spell {
  faction = Faction.GreyOrder
  value = 9

  astral = true

  action = RuleId.BackupAction
}
