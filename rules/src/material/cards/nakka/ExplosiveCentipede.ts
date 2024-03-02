import { Faction } from '../../Faction'
import { trigger } from '../Ability'
import { Creature } from '../Creature'
import { TriggerAction, TriggerCondition } from '../Effect'

export class ExplosiveCentipede extends Creature {
  faction = Faction.Nakka
  value = 2

  attack = 2
  defense = 2

  weakness = trigger(TriggerAction.Destroy).when(TriggerCondition.Attack)
}
