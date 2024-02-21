import { getDistanceBetweenSquares, isMoveItem, ItemMove, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'


export class CoriolisWindActionRule extends CardActionRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const coriolisWind = this.cardRule
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const indexesCanMove = coriolisWind.getOtherCardsAdjacentTo(coriolisWind.item.location as XYCoordinates)
      .player(player => player !== this.player)
      .filter((_, index) => getCardRule(this.game, index).isCreature).getIndexes()
    for (const index of indexesCanMove) {
      const card = getCardRule(this.game, index)
      const legalDestinations = battlefieldCoordinates.filter(coordinates =>
        getDistanceBetweenSquares(card.item.location as XYCoordinates, coordinates) <= 3
        && battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y).length === 0
        && card.thereIsAnotherCardAdjacentTo(coordinates)
      )
      for (const { x, y } of legalDestinations) {
        moves.push(card.cardMaterial.moveItem({ type: LocationType.Battlefield, x, y, player: this.player }))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
      return this.afterCardAction()
    }
    return []
  }
}
