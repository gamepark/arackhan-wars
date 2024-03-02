import { Faction } from '../../Faction'
import { defense, immuneToEnemySpells, trigger } from '../Ability'
import { adjacent, allied, creature, maxValue, withAttribute } from '../AbilityTargetFilter'
import { AttributeType } from '../Attribute'
import { ModifyDefenseCondition, TriggerAction, TriggerCondition } from '../Effect'
import { Land } from '../Land'

export class GhostMetalMonolith extends Land {
  faction = Faction.GreyOrder
  value = 10

  defense = 4

  benefits = [
    immuneToEnemySpells().to(adjacent, allied, creature),
    defense(+2, ModifyDefenseCondition.AttackedByFlyOrMoves).to(adjacent, allied, creature),
    trigger(TriggerAction.Destroy).when(TriggerCondition.EndOfRound).to(adjacent, creature, maxValue(5), withAttribute(AttributeType.Flight))
  ]
}
