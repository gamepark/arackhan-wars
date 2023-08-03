import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { CannotBeAttacked, EffectType } from '../../descriptions/base/Effect'
import { FactionCardKind } from '../../descriptions/base/FactionCardCharacteristics'

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

  effect: CannotBeAttacked = { type: EffectType.CannotBeAttacked, by: FactionCardKind.Creature }

  getEffectRule(game: MaterialGame) {
    return new CantBeAttackedEffect(game)
  }

}
