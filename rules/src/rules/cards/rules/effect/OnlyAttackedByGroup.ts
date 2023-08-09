import { Ability } from '../../descriptions/base/Ability'
import { EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const onlyAttackedByGroup = new Ability()
onlyAttackedByGroup.effect = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoLonelyCreature }
