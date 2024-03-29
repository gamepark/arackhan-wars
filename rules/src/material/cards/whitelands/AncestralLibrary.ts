import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { defense } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'

export class AncestralLibrary extends Land {
  faction = Faction.Whitelands
  value = 10

  defense = 5

  benefit = defense(+1).to(adjacent, allied, creature)
  action = RuleId.AncestralLibraryAction
}
