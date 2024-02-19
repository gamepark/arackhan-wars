import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { defense } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class NemesioWhitelands extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 2
  deckBuildingValue = 8
  fullArt = true

  attack = 0
  defense = 1

  attribute = movement(2)
  skill = defense(+1).per(adjacent, allied, creature)
  action = RuleId.NemesioWhitelandsAction
}
