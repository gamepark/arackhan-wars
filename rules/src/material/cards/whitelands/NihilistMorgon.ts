import { Faction } from '../../Faction'
import { modifyMovement } from '../Ability'
import { movement } from '../Attribute'
import { Creature } from '../Creature'
import { ModifyMovementCondition } from '../Effect'
import { Family } from '../Family'

export class NihilistMorgon extends Creature {
  faction = Faction.Whitelands
  value = 6

  family = Family.Nihilist
  attack = 1
  defense = 2

  attribute = movement(2)
  skill = modifyMovement(+2, ModifyMovementCondition.DoNotAttack, ModifyMovementCondition.EndMovementAdjacentToEnemyCard)
}
