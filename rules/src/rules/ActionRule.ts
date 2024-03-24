import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Attack } from './AttackRule'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'

export class ActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.availableCards
      .filter(index => getCardRule(this.game, index).canPerformAction)
      .map(index => this.rules().customMove(CustomMoveType.PerformAction, index))
  }

  get availableCards() {
    if (this.remind<Attack[]>(Memory.Attacks).length > 0) return []
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length > 0) return movedCards
    const oncePerRound = this.remind<number[]>(Memory.OncePerRound) ?? []
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes().filter(index => !oncePerRound.includes(index))
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    this.memorize(Memory.ActionCard, move.data)
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    for (const movedCard of movedCards) {
      if (movedCard !== move.data) {
        moves.push(this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(movedCard).rotateItem(true))
      }
    }
    this.memorize<number[]>(Memory.MovedCards, [])
    moves.push(this.rules().startRule(getCardRule(this.game, move.data).characteristics!.action!))
    return moves
  }
}
