import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { FactionCardDetail } from '../../descriptions/base/FactionCardDetail'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { MaterialType } from '../../../../material/MaterialType'
import { ExchangedCharacteristics } from '../action/ActionMemory'

export class GetCardDescription extends MaterialRulesPart {
  get(cardIndex: number): FactionCardDetail {
    if (!this.getGameMemory()) return getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(cardIndex)!.id.front)
    const { exchanges } = this.getGameMemory<ExchangedCharacteristics>()
    if (!exchanges?.length) return getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(cardIndex)!.id.front)
    const sourceExchange = exchanges.find((e) => e.source === cardIndex)
    if (sourceExchange) return getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(sourceExchange.target)!.id.front)

    const targetExchange = exchanges.find((e) => e.target === cardIndex)
    if (targetExchange) return getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(targetExchange.source)!.id.front)

    return getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(cardIndex)!.id.front)
  }
}
