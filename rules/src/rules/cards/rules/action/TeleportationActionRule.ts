import { PlayerTurnRule } from '@gamepark/rules-api/dist/material/rules/PlayerTurnRule'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getAvailableCardPlacement } from '../../../../utils/move.utils'
import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../../RuleId'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'

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

    return [
      this.rules().startPlayerTurn(RuleId.ActivationRule, this.player)
    ]
  }
}
