import { Material } from '@gamepark/rules-api'
import { Family } from '../../material/cards/Family'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class MusicalTranceActionRule extends MoveCardsActionRule {
  maxDistance = 2

  getCardsAllowedToMove(): Material {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    return this.battlefield.player(this.player).filter((_, index) => {
        if (movedCards.includes(index)) return false
        return getCardRule(this.game, index).families.some(family =>
          family === Family.Musician || family === Family.Dancer
        )
      }
    )
  }
}
