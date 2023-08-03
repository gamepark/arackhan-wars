import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { AttackLimitation, CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { FactionCardKind } from '../../descriptions/base/FactionCardCharacteristics'

export class CantBeAttackedByGroup extends AttackEffect {

  canBeAttacked(_attacker: number, _opponent: number, otherAttackers: number[] = []): boolean {
    return otherAttackers.length === 0
  }
}

export const onlyNotGroupedAttack = new class extends Ability {

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, by: FactionCardKind.Creature, except: AttackLimitation.Alone }

  getEffectRule(game: MaterialGame): EffectRule {
    return new CantBeAttackedByGroup(game)
  }
}
