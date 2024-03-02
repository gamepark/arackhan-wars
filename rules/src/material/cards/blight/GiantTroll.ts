import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { Creature } from '../Creature'
import { ModifyAttackCondition } from '../Effect'
import { Family } from '../Family'

export class GiantTroll extends Creature {
  faction = Faction.Blight
  value = 8

  family = Family.Troll
  attack = 3
  defense = 2

  skill = attack(+1, ModifyAttackCondition.TargetFly)
  weakness = attack(-1, ModifyAttackCondition.TargetInitiative)
}
