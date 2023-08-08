import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, Trigger, TriggerAction, TriggerCondition } from '../../descriptions/base/Effect'

export class DestroyWhenAttackFailEffect extends AttackEffect {
}

export const destroyIfAttackFail = (filter: ApplicableFilter[]) => new class extends Ability {
  constructor() {
    super(filter)
  }

  effect: Trigger = { type: EffectType.Trigger, condition: TriggerCondition.FailAttack, action: TriggerAction.SelfDestroy }

  getEffectRule(game: MaterialGame) {
    return new DestroyWhenAttackFailEffect(game)
  }

}
