import { Material, XYCoordinates } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class WarpPathActionRule extends MoveCardsActionRule {
  moves = 4

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(this.player).filter((_, index) => getCardRule(this.game, index).isCreature)
  }

  getLegalDestinations(): XYCoordinates[] {
    return this.battlefield.player(this.player)
      .filter((_, index) => getCardRule(this.game, index).isCreature)
      .getItems().map(item => item.location as XYCoordinates)
  }
}
