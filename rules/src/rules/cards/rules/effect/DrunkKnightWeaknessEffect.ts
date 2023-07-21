import { getFactionCardDescription } from '../../../../material/FactionCard'
import { MaterialType } from '../../../../material/MaterialType'
import { Effect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { himself } from '../../descriptions/utils/applicable-filter.utils'

export class DrunkKnightWeaknessEffect extends AttackEffect {

  canAttack(_attacker: number, opponent: number) {
    const item = this.material(MaterialType.FactionCard).index(opponent).getItem()!
    const otherCard = getFactionCardDescription(item.id.front)
    return otherCard.value % 2 === 0 && super.canAttack(_attacker, opponent)
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
