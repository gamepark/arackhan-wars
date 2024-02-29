import { Faction } from '../../Faction'
import { attack, extraScore, trigger } from '../Ability'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { ExtraScoreType, ModifyAttackCondition, TriggerAction, TriggerCondition } from '../Effect'

export class DragonSlayer extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 13

  attack = 1
  defense = 2

  attribute = rangedAttack(3)
  skills = [
    attack(+2, ModifyAttackCondition.TargetFlyOrMoves),
    trigger(TriggerAction.PutCardUnder).when(TriggerCondition.DestroyFlyOrMove),
    extraScore(ExtraScoreType.ValueOfCardsUnder)
  ]
}
