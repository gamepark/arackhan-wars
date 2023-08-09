import { Ability } from '../../descriptions/base/Ability'
import { CannotAttack, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const drunkKnight: Ability = new class extends Ability {
  effect: CannotAttack = { type: EffectType.CannotAttack, except: AttackLimitation.EvenValueDefender }
}
