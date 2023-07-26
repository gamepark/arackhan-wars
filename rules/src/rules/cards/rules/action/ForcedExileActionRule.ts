import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getAvailableCardPlacement } from '../../../../utils/move.utils'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { CardActionRule } from './CardActionRule'


export class ForcedExileActionRule extends CardActionRule {

  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const enemiesCards = battlefield
      .player((player) => player !== this.player)
      .filter((item) => getFactionCardDescription(item.id.front).kind === FactionCardKind.Creature)

    return getAvailableCardPlacement(battlefield.getItems(), enemiesCards, this.player)
  }

  afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.FactionCard) return []
    return super.afterCardAction()
  }
}
