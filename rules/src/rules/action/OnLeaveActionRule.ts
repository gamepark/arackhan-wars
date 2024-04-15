import { Material, MaterialMove, MoveItem, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class OnLeaveActionRule extends MoveCardsActionRule {
  moves = 1

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(this.player).index(index => getCardRule(this.game, index).isCreature)
  }

  getLegalDestinations(card: Material): XYCoordinates[] {
    const battlefield = this.battlefield
    const cardRule = getCardRule(this.game, card.getIndex())
    return battlefieldCoordinates.filter(coordinates => {
      const otherAdjacentCards = cardRule.getOtherCardsAdjacentTo(coordinates)
      return otherAdjacentCards.player(this.player).length > 0 && otherAdjacentCards.player(p => p !== this.player).length === 0
        && !battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y).length
    })
  }


  afterCardMove(move: MoveItem): MaterialMove[] {
    const moves = super.afterCardMove(move)
    const token = this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(move.itemIndex)
    if (token.length) {
      moves.unshift(token.rotateItem(true))
    }
    return moves
  }
}
