import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { trigger } from '../base/Ability'
import { TriggerAction, TriggerCondition } from '../base/Effect'
import { perforation } from '../base/Attribute'

export class ChildEater extends Creature {
  faction = Faction.Blight
  value = 13
  deckBuildingValue = 15

  attack = 4
  defense = 2

  attribute = perforation
  weakness = trigger(TriggerAction.SelfDestroy).when(TriggerCondition.FailAttack)
}
