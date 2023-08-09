import { Ability } from '../../descriptions/base/Ability'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const onlyAttackedByGroup = new class extends Ability {
  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoLonelyCreature }
}
