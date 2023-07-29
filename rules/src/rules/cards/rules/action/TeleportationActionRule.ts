import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getAvailableCardPlacement } from '../../../../utils/move.utils'
import { getCharacteristics } from '../../../../material/FactionCard'
import { CardActionRule } from './CardActionRule'
import { isCreature } from '../../descriptions/base/Creature'

export class TeleportationActionRule extends CardActionRule {
  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const alliedCards = battlefield
      .player(this.player)
      .filter((_, index) => isCreature(getCharacteristics(index, this.game)))

    return getAvailableCardPlacement(battlefield.getItems(), alliedCards, this.player)
  }

  afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (!(isMoveItem(move) && move.itemType === MaterialType.FactionCard)) return []
    return super.afterCardAction()
  }
}
