import { Ability } from '../../descriptions/base/Ability'
import { EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export const drunkKnight: Ability = new Ability()
drunkKnight.effect = { type: EffectType.CannotAttack, except: AttackLimitation.EvenValueDefender }
