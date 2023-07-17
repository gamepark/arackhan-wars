import { AttackRule } from '../base/AttackRule'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { CardModification } from '../base/EffectRule'

export class DrunkKnightAttackRule extends AttackRule {
  canAttackTheOpponent(opponent: MaterialItem<PlayerId, LocationType>, opponentIndex: number, modifications: Record<number, CardModification>): boolean {
    const otherCard = getFactionCardDescription(opponent.id.front)
    if (otherCard.value % 2 !== 0) return false

    return super.canAttackTheOpponent(opponent, opponentIndex, modifications)
  }

}
