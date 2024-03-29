import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class MusicalTrance extends Spell {
  faction = Faction.Nakka
  value = 4
  fullArt = true

  astral = true

  action = RuleId.MusicalTranceAction
}
