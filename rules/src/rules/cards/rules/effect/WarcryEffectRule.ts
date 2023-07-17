import { CardModification, EffectRule } from '../base/EffectRule'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'

export class WarcryEffectRule extends EffectRule {
  isApplicable(isAlly: boolean, cardIndex: number): boolean {
    if (!isAlly) return false
    const item = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    const factionCard = getFactionCardDescription(item.id.front)
    return factionCard.family === '6th-legion'
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 1
    }
  }

  isAdjacentTo(): boolean {
    return true
  }
}
