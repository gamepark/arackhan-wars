import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { AttackLimitation, CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { FactionCardKind } from '../../descriptions/base/FactionCardCharacteristics'

export class OnlyAttackedByGroup extends AttackEffect {
  isValidAttack(_attackers: number[]): boolean {
    return _attackers.length > 1
  }
}

export const onlyAttackedByGroup = new class extends Ability {

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, by: FactionCardKind.Creature, except: AttackLimitation.Group }

  getEffectRule(game: MaterialGame): EffectRule {
    return new OnlyAttackedByGroup(game)
  }
}
