import { Material, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class NemesioNakkaActionRule extends MoveCardsActionRule {
  moves = 2

  getCardsAllowedToMove(): Material {
    const nemesio = this.cardRule
    return nemesio.getOtherCardsAdjacentTo(nemesio.item.location as XYCoordinates)
      .player(this.player)
      .filter((_, index) => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.value <= 8
      })
  }

  getLegalDestinations(): XYCoordinates[] {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.player)
      .filter((_, index) => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.value <= 8
      }).getItems().map(item => item.location as XYCoordinates)
  }
}
