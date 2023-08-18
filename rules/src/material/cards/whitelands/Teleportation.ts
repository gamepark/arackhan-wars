import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { RuleId } from '../../../rules/RuleId'
import { initiative } from '../Attribute'

export class Teleportation extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 4

  astral = true

  attribute = initiative

  action = RuleId.TeleportationActionRule
}
