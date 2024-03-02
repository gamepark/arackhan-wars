import { CustomMove, getDistanceBetweenSquares, isMoveItemType, ItemMove, Material, MaterialMove, MoveItem, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { CustomMoveType } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveRules } from '../MoveRules'
import { CardActionRule } from './CardActionRule'

export abstract class MoveCardsActionRule extends CardActionRule {
  moves?: number
  maxDistance?: number

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const cardsAllowedToMove = this.getCardsAllowedToMove()
    for (const index of cardsAllowedToMove.getIndexes()) {
      const card = cardsAllowedToMove.index(index)
      const cardRule = getCardRule(this.game, index)
      const legalDestinations = this.getLegalDestinations(card)
      for (const { x, y } of legalDestinations) {
        if (cardRule.item.location.x !== x || cardRule.item.location.y !== y) {
          moves.push(cardRule.cardMaterial.moveItem(item => ({ type: LocationType.Battlefield, x, y, player: item.location.player })))
        }
      }
    }
    if (this.remind<number[]>(Memory.MovedCards).length > 0) {
      moves.push(this.rules().customMove(CustomMoveType.Pass))
    }
    return moves
  }

  get battlefield() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
  }

  abstract getCardsAllowedToMove(): Material

  getLegalDestinations(card: Material): XYCoordinates[] {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const canSwap = this.canSwap()
    const cardRule = getCardRule(this.game, card.getIndex())
    return battlefieldCoordinates.filter(coordinates => {
      const distance = getDistanceBetweenSquares(cardRule.item.location as XYCoordinates, coordinates)
      if (this.maxDistance !== undefined && distance > this.maxDistance) return false
      const swap = battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y)
      if (swap.length) {
        if (!canSwap || swap.getIndex() === card.getIndex()) return false
        if (!this.getCardsAllowedToMove().getItem(swap.getIndex())) return false
        return distance === 1 ||
          (cardRule.thereIsAnotherCardAdjacentTo(coordinates)
            && getCardRule(this.game, swap.getIndex()).thereIsAnotherCardAdjacentTo(cardRule.item.location as XYCoordinates))
      }
      return cardRule.thereIsAnotherCardAdjacentTo(coordinates)
    })
  }

  canSwap() {
    if (!this.moves) return true
    return this.moves - this.remind<number[]>(Memory.MovedCards).length > 1
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      return this.beforeCardMove(move)
    }
    return []
  }

  beforeCardMove(move: MoveItem): MaterialMove[] {
    this.memorize<number[]>(Memory.MovedCards, cards => [...cards, move.itemIndex])
    return new MoveRules(this.game).getSwapMoves(move)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      return this.afterCardMove(move)
    }
    return []
  }

  afterCardMove(move: MoveItem): MaterialMove[] {
    if ((this.moves && this.remind<number[]>(Memory.MovedCards).length >= this.moves)
      || (!this.getCardsAllowedToMove().length && !this.isSwapPending(move))) {
      return this.afterCardAction()
    }
    return []
  }

  isSwapPending(move: MoveItem): boolean {
    return this.material(MaterialType.FactionCard)
      .location(l => l.type === LocationType.Battlefield && l.x === move.location.x && l.y === move.location.y)
      .length > 1
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.afterCardAction()
    }
    return []
  }

  onRuleEnd() {
    this.memorize(Memory.MovedCards, [])
    return super.onRuleEnd()
  }
}
