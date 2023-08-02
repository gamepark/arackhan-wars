import { Ability } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { himself } from '../../descriptions/utils/applicable-filter.utils'
import { getCardRule } from '../base/CardRule'


export class DrunkKnightWeaknessEffect extends AttackEffect {

  canAttack(_attacker: number, opponent: number, _otherAttackers: number[] = [], game: MaterialGame) {
    const otherCard = getCardRule(game, opponent).characteristics
    return otherCard.value % 2 === 0 && super.canAttack(_attacker, opponent, _otherAttackers, game)
  }
}

export const drunkKnight: Ability = new class extends Ability {

  constructor() {
    super([himself])

  }

  getEffectRule(game: MaterialGame) {
    return new DrunkKnightWeaknessEffect(game)
  }
}
