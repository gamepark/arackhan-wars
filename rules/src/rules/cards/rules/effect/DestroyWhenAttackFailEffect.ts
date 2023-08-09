import { Ability } from '../../descriptions/base/Ability'
import { EffectType, TriggerAction, TriggerCondition } from '../../descriptions/base/Effect'

export const destroyIfAttackFail = new Ability()
destroyIfAttackFail.effect = { type: EffectType.Trigger, condition: TriggerCondition.FailAttack, action: TriggerAction.SelfDestroy }
