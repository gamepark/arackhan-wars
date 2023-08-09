import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, Trigger, TriggerAction, TriggerCondition } from '../../descriptions/base/Effect'

export const destroyIfAttackFail = (filter: ApplicableFilter[]) => new class extends Ability {
  constructor() {
    super(filter)
  }

  effect: Trigger = { type: EffectType.Trigger, condition: TriggerCondition.FailAttack, action: TriggerAction.SelfDestroy }
}
