import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { RuleId } from '../../../RuleId'
import { initiative } from '../base/Attribute'

export class Teleportation extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 4

  astral = true

  attribute = initiative

  action = RuleId.TeleportationActionRule
}
