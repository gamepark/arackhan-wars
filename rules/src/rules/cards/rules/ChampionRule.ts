import { FactionCardRule } from './base/FactionCardRule'
import { MaterialType } from '../../../material/MaterialType'
import { getFactionCardDescription } from '../../../material/FactionCard'
import { CardModification } from './base/EffectRule'

export class ChampionRule extends FactionCardRule {

  isEffectApplicable(cardIndex: number, isAlly: boolean): boolean {
    if (!isAlly) return false
    const otherCard = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    const factionCard = getFactionCardDescription(otherCard.id.front)
    return factionCard.family === this.card.family
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 1,
      defense: 1
    }
  }
}
