import { FactionCardRule } from './base/FactionCardRule'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { CardModification } from './base/EffectRule'
import { MaterialType } from '../../../material/MaterialType'
import { getFactionCardDescription } from '../../../material/FactionCard'
import { FactionCardKind } from '../descriptions/FactionCardDetail'

export class ForgePatriarchRule extends FactionCardRule {

  getAttackModifier(_cardItem: MaterialItem, _cardIndex: number): CardModification | undefined {
    const factionCard = getFactionCardDescription(this.material(MaterialType.FactionCard).index(_cardIndex).getItem()!.id.front)
    if (factionCard.kind !== FactionCardKind.Creature) return

    return {
      attack: 1
    }
  }
}
