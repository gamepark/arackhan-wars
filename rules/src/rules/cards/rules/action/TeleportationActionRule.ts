import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getAvailableCardPlacement } from '../../../../utils/move.utils'
import { RuleId } from '../../../RuleId'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { discardCard } from '../../../../utils/discard.utils'

export class TeleportationActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const alliedCards = battlefield
      .player(this.player)
      .filter((item) => getFactionCardDescription(item.id.front).kind === FactionCardKind.Creature)

    return getAvailableCardPlacement(battlefield.getItems(), alliedCards, this.player)
  }

  afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (!(isMoveItem(move) && move.itemType === MaterialType.FactionCard)) return []
    const card = this.material(MaterialType.FactionCard).index(move.itemIndex)

    return [
      ...discardCard(card),
      this.rules().startPlayerTurn(RuleId.ActivationRule, this.player)
    ]
  }
}
