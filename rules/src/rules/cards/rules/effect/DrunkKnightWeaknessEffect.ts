import { Ability } from '../../descriptions/base/Ability'
import { himself } from '../../descriptions/utils/applicable-filter.utils'
import { CannotAttack, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const drunkKnight: Ability = new class extends Ability {

  constructor() {
    super([himself])
  }

  effect: CannotAttack = { type: EffectType.CannotAttack, except: AttackLimitation.EvenValueDefender }
}
