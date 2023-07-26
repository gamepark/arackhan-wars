import { Effect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { himself } from '../../descriptions/utils/applicable-filter.utils'
import { GetCardDescription } from '../helper/GetCardDescription'


export class DrunkKnightWeaknessEffect extends AttackEffect {

  canAttack(_attacker: number, opponent: number, _otherAttackers: number[] = [], cardDescriptionHelper: GetCardDescription) {
    const otherCard = cardDescriptionHelper.get(opponent)
    return otherCard.value % 2 === 0 && super.canAttack(_attacker, opponent, _otherAttackers, cardDescriptionHelper)
  }
}

export const drunkKnight: Effect = new class extends Effect {

  constructor() {
    super([himself])

  }

  getEffectRule(game: MaterialGame) {
    return new DrunkKnightWeaknessEffect(game)
  }
}
