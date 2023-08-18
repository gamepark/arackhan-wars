import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { CardActionRule } from './CardActionRule'
import { getCardRule } from '../base/CardRule'
import { battlefieldCoordinates } from '../../../../material/Board'

export class TeleportationActionRule extends CardActionRule {
  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const myCards = battlefield.player(this.player)
    return battlefieldCoordinates.flatMap(({ x, y }) => {
      if (battlefield.location(location => location.x === x && location.y === y).length) return []
      return myCards.filter((_, index) => {
        const rule = getCardRule(this.game, index)
        return rule.isCreature && rule.thereIsAnotherCardAdjacentTo({ x, y })
      }).moveItems({ location: { type: LocationType.Battlefield, x, y, player: this.player } })
    })
  }

  afterItemMove(move: ItemMove<number, number, number>) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.position.location?.type === LocationType.Battlefield) {
      return super.afterCardAction()
    }
    return []
  }
}
