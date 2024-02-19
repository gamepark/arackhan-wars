import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { ignoreAttackDefenseModifiers } from '../Ability'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class IceElemental extends Creature {
  faction = Faction.Whitelands
  value = 6

  family = Family.Elemental
  attack = 1
  defense = 2

  skill = ignoreAttackDefenseModifiers()
  action = RuleId.IceElementalAction
}
