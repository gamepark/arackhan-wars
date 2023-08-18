import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { trigger } from '../Ability'
import { TriggerAction, TriggerCondition } from '../Effect'
import { perforation } from '../Attribute'

export class ChildEater extends Creature {
  faction = Faction.Blight
  value = 13
  deckBuildingValue = 15

  attack = 4
  defense = 2

  attribute = perforation
  weakness = trigger(TriggerAction.SelfDestroy).when(TriggerCondition.FailAttack)
}
