import { Material, XYCoordinates } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class NemesioNakkaActionRule extends MoveCardsActionRule {
  moves = 2

  getCardsAllowedToMove(): Material {
    const nemesio = this.cardRule
    return nemesio.getOtherCardsAdjacentTo()
      .player(this.player)
      .index(index => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.value <= 8
      })
  }

  getLegalDestinations(): XYCoordinates[] {
    return this.battlefield.player(this.player)
      .index(index => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.value <= 8 && cardRule.index !== this.cardIndex
      }).getItems().map(item => item.location as XYCoordinates)
  }
}
