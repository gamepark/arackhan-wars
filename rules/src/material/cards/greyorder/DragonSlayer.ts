import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { ModifyAttackCondition } from '../Effect'

export class DragonSlayer extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 13

  attack = 1
  defense = 2

  attribute = rangedAttack(3)
  skills = [
    attack(+2, ModifyAttackCondition.TargetFlyOrMoves)
    // TODO skills
  ]
}
