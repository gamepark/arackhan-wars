import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'

export class TeleportationActionRule extends CardActionRule {
  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const myCards = battlefield.player(this.player)
    return battlefieldCoordinates.flatMap(({ x, y }) => {
      if (battlefield.location(location => location.x === x && location.y === y).length) return []
      return myCards.filter((_, index) => {
        const rule = getCardRule(this.game, index)
        return rule.isCreature && rule.thereIsAnotherCardAdjacentTo({ x, y })
      }).moveItems({ type: LocationType.Battlefield, x, y, player: this.player })
    })
  }

  afterItemMove(move: ItemMove<number, number, number>) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
      return super.afterCardAction()
    }
    return []
  }
}
