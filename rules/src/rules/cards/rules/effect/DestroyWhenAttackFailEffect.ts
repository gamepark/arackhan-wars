import { Ability } from '../../descriptions/base/Ability'
import { EffectType, Trigger, TriggerAction, TriggerCondition } from '../../descriptions/base/Effect'

export const destroyIfAttackFail = new class extends Ability {
  effect: Trigger = { type: EffectType.Trigger, condition: TriggerCondition.FailAttack, action: TriggerAction.SelfDestroy }
}
