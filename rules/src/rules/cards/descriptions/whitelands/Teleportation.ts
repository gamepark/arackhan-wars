import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { initiative } from '../../rules/attribute'
import { RuleId } from '../../../RuleId'

export class Teleportation extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 4

  astral = true

  attribute = initiative

  actionRule = RuleId.TeleportationActionRule
}
