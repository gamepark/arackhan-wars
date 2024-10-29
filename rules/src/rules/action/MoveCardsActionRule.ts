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
  maxDistance: number = Infinity

  canPlay(): boolean {
    const cardsAllowedToMove = this.getCardsAllowedToMove()
    for (const index of cardsAllowedToMove.getIndexes()) {
      const card = cardsAllowedToMove.index(index)
      const legalDestinations = this.getLegalDestinations(card)
      if (legalDestinations.length > 0) return true
    }
    return false
  }

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
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  get battlefield() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
  }

  abstract getCardsAllowedToMove(): Material

  getLegalDestinations(card: Material): XYCoordinates[] {
    const battlefield = this.battlefield
    const cardRule = getCardRule(this.game, card.getIndex())
    return battlefieldCoordinates.filter(coordinates =>
      getDistanceBetweenSquares(cardRule.item.location as XYCoordinates, coordinates) <= this.maxDistance
      && battlefield.location(l => l.x === coordinates.x && l.y === coordinates.y).length === 0
      && cardRule.thereIsAnotherCardAdjacentTo(coordinates)
    )
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
