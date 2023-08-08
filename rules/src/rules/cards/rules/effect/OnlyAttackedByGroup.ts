import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'
import { himself } from '../../descriptions/utils/applicable-filter.utils'

export class OnlyAttackedByGroup extends AttackEffect {
}

export const onlyAttackedByGroup = new class extends Ability {

  constructor() {
    super([himself])
  }

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoLonelyCreature }

  getEffectRule(game: MaterialGame): EffectRule {
    return new OnlyAttackedByGroup(game)
  }
}
