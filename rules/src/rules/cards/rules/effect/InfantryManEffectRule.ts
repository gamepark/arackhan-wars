import { CardModification, EffectRule } from '../base/EffectRule'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'

export class InfantryManEffectRule extends EffectRule {
  isApplicable(isAlly: boolean, cardIndex: number): boolean {
    if (!isAlly) return false
    const otherCard = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    const factionCard = getFactionCardDescription(otherCard.id.front)
    return factionCard.family === this.card.family
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 1
    }
  }
}
