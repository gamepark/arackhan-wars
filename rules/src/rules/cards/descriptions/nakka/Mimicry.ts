import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { RuleId } from '../../../RuleId'

export class Mimicry extends Spell {
  faction = Faction.Nakka
  value = 3

  astral = true

  actionRule = RuleId.MimicryActionRule
}
