import { Ability } from '../../descriptions/base/Ability'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'
import { himself } from '../../descriptions/utils/applicable-filter.utils'

export const onlyAttackedByGroup = new class extends Ability {

  constructor() {
    super([himself])
  }

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoLonelyCreature }
}
