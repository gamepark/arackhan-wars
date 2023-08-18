import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { RuleId } from '../../../rules/RuleId'

export class Mimicry extends Spell {
  faction = Faction.Nakka
  value = 3

  astral = true

  action = RuleId.MimicryActionRule
}
