import { AttackRules } from '../base/AttackRules'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'

export class DrunkKnightAttackRule extends AttackRules {
  canAttackTheOpponent(opponent: MaterialItem) {
    const otherCard = getFactionCardDescription(opponent.id.front)
    if (otherCard.value % 2 !== 0) return false

    return super.canAttackTheOpponent(opponent)
  }

}
