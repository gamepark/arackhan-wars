import { EffectRule } from '../base/EffectRule'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { MaterialType } from '../../../../material/MaterialType'
import { FactionCardKind } from '../../descriptions/FactionCardDetail'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'

export class ForgePatriarchEffectRule extends EffectRule {

  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(_isAlly: boolean, _cardItem: MaterialItem, cardIndex: number) {
    const factionCard = getFactionCardDescription(this.material(MaterialType.FactionCard).index(cardIndex).getItem()!.id.front)
    if (factionCard.kind !== FactionCardKind.Creature) return

    return {
      attack: 1
    }
  }
}
