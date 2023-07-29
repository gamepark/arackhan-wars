import { FactionCard } from '../../../../material/FactionCard'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { initiative } from '../../rules/attribute'
import { RuleId } from '../../../RuleId'

export class Teleportation extends Spell {
  id = FactionCard.Teleportation
  faction = Faction.Whitelands

  value = 4
  astral = true

  attribute = initiative

  actionRule = RuleId.TeleportationActionRule
}
