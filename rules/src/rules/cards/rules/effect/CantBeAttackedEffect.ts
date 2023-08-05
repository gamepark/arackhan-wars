import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { AttackLimitation } from '../../descriptions/base/AttackLimitation'

export class CantBeAttackedEffect extends AttackEffect {

  constructor(game: MaterialGame) {
    super(game)
  }

  canBeAttacked(): boolean {
    return false
  }
}

export const cantBeAttacked = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, except: AttackLimitation.NoCreature }

  getEffectRule(game: MaterialGame) {
    return new CantBeAttackedEffect(game)
  }

}
