import { FactionCardRule } from './base/FactionCardRule'
import { getFactionCardDescription } from '../../../material/FactionCard'
import { MaterialType } from '../../../material/MaterialType'

export class WarcryRule extends FactionCardRule {
  onRoundEnd = () => {
    return this.discardCard()
  }

  isEffectApplicable(_cardIndex: number, _isAlly: boolean): boolean {
    const item = this.material(MaterialType.FactionCard).index(_cardIndex).getItem()!
    const factionCard = getFactionCardDescription(item.id.front)
    return factionCard.family === this.card.family
  }

  isAdjacentTo(): boolean {
    return true
  }
}
