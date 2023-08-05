import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'
import { himself } from '../../descriptions/utils/applicable-filter.utils'

export class CantBeAttackedByGroup extends AttackEffect {

  canBeAttacked(_attacker: number, _opponent: number, otherAttackers: number[] = []): boolean {
    return otherAttackers.length === 0
  }
}

export const onlyNotGroupedAttack = new class extends Ability {

  constructor() {
    super([himself])
  }

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoGroupedCreatures }

  getEffectRule(game: MaterialGame): EffectRule {
    return new CantBeAttackedByGroup(game)
  }
}
