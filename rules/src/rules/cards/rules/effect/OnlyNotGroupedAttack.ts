import { Ability } from '../../descriptions/base/Ability'
import { EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const onlyNotGroupedAttack = new Ability()
onlyNotGroupedAttack.effect = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoGroupedCreatures }
