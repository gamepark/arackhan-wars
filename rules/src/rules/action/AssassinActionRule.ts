import { Material, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class AssassinActionRule extends MoveCardsActionRule {
  moves = 2

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(this.player).index(index => {
      const cardRule = getCardRule(this.game, index)
      return index === this.cardIndex || (cardRule.isCreature && cardRule.value <= 4)
    })
  }

  getLegalDestinations(card: Material): XYCoordinates[] {
    if (card.getIndex() === this.cardIndex) {
      return this.battlefield.player(this.player)
        .index(index => {
          const cardRule = getCardRule(this.game, index)
          return cardRule.isCreature && cardRule.value <= 4
        })
        .getItems().map(item => item.location as XYCoordinates)
    } else {
      return [this.actionCard.location as XYCoordinates]
    }
  }

  afterCardAction(): MaterialMove[] {
    this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, this.cardIndex])
    return [this.startRule(RuleId.ActivationRule)]
  }
}
