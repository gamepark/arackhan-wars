import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isMovementAttribute } from '../attribute/MovementAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { Memory } from '../../../Memory'
import { getCardRule } from './CardRule'
import { deactivateTokens } from '../../../../utils/activation.utils'
import { Attack } from './AttackRule'

export class MoveRules extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove[] {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length) {
      const token = this.material(MaterialType.FactionToken).parent(movedCards[0])
      return deactivateTokens(token)
    }
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    const cardsAbleToMove = this.material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .player(this.player)
      .getIndexes()
      .filter(index => getCardRule(this.game, index).canMove && !attacks.some(attack => attack.card === index))

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

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)) {
      if (move.itemType === MaterialType.FactionCard && move.position.location?.type === LocationType.Battlefield) {
        this.memorize(Memory.MovedCards, movedCards => [...movedCards, move.itemIndex])
        const cardToSwap = this.material(MaterialType.FactionCard)
          .location(location => location.type === LocationType.Battlefield
            && location.x === move.position.location?.x && location.y === move.position.location?.y)
          .filter((_, index) => index !== move.itemIndex)
        if (cardToSwap.length) {
          const swapLocation = this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.location
          return [cardToSwap.moveItem({ location: { ...swapLocation } })]
        }
      }
      if (move.itemType === MaterialType.FactionToken) {
        const token = this.material(MaterialType.FactionToken).getItem(move.itemIndex)
        this.memorize<number[]>(Memory.MovedCards, movedCards => movedCards.filter(card => card !== token?.location.parent))
      }
    }
    return []
  }
}
