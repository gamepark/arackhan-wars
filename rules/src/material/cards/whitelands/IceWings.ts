import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class IceWings extends Spell {
  faction = Faction.Whitelands
  value = 3

  astral = true

  action = RuleId.IceWingsAction
}
