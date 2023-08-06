import { MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { isMovementAttribute } from '../attribute/MovementAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { ActivatedCard } from '../../../types'
import { LocationType } from '../../../../material/LocationType'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { Memory } from '../../../Memory'
import { getCardRule } from './CardRule'

export class MoveRules extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const activatedCards = this.remind<ActivatedCard[]>(Memory.ActivatedCards)
    const cardsAbleToMove = this.material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .player(this.player)
      .getIndexes()
      .filter(index => getCardRule(this.game, index).canMove && !activatedCards.some(activatedCard => activatedCard.card === index))

    return cardsAbleToMove.flatMap(card => this.getMoves(card))
  }

  getMoves(cardIndex: number): MaterialMove[] {
    const cardMaterial = this.material(MaterialType.FactionCard).index(cardIndex)
    const characteristics = getCardRule(this.game, cardIndex).characteristics

    return characteristics
      .getAttributes()
      .filter(isMovementAttribute)
      .flatMap((attribute) => attribute.getAttributeRule(this.game).getLegalMovements(cardMaterial))
  }

  beforeItemMove(move: MoveItem): MaterialMove[] {
    if (move.position.location?.type === LocationType.Battlefield) {
      const cardToSwap = this.material(MaterialType.FactionCard)
        .location(location => location.type === LocationType.Battlefield
          && location.x === move.position.location?.x && location.y === move.position.location?.y)
        .filter((_, index) => index !== move.itemIndex)
      if (cardToSwap.length) {
        const swapLocation = this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.location
        this.memorizeCardPlayed({ card: cardToSwap.getIndex() })
        return [cardToSwap.moveItem({ location: { ...swapLocation } })]
      }
    }
    return []
  }

  afterItemMove(move: MoveItem): MaterialMove[] {
    this.memorizeCardPlayed({ card: move.itemIndex })
    return []
  }

  memorizeCardPlayed(activation: ActivatedCard) {
    const activatedCards = this.remind<ActivatedCard[]>(Memory.ActivatedCards)
    const activatedCard = activatedCards.find((activatedCard) => activatedCard.card === activation.card)
    if (!activatedCard) {
      this.memorize<ActivatedCard[]>(Memory.ActivatedCards, activatedCards => [...activatedCards, activation])
    } else {
      const updatedActivation = { ...activatedCards, ...activation }
      this.memorize<ActivatedCard[]>(Memory.ActivatedCards, activatedCards => [...activatedCards.filter((card) => card !== activatedCard), updatedActivation])
    }
  }
}
