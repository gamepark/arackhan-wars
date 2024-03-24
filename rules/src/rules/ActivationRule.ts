import { CustomMove, isCustomMove, isMoveItem, isStartPlayerTurn, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionRule } from './ActionRule'
import { Attack, AttackRule } from './AttackRule'
import { EndOfTurnRule } from './EndOfTurnRule'
import { Memory } from './Memory'
import { MoveRules } from './MoveRules'
import { RuleId } from './RuleId'

export class ActivationRule extends PlayerTurnRule {

  onRuleStart(move: RuleMove) {
    if (isStartPlayerTurn(move)) {
      this.memorize(Memory.MovedCards, [])
      this.memorize(Memory.Attacks, [])
      this.memorize(Memory.TurnEffects, [])

      // If we know all the cards in the player's hand, we know all the legal moves. If there is only 1 legal move (pass), automatically play it.
      const playerCards = this.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(this.player).getItems()
      if (playerCards.every(card => card.id.front !== undefined)) {
        const moves = this.getPlayerMoves()
        if (moves.length === 1) {
          return moves
        }
      }
    }
    return []
  }

  // Automatically Solve attacks & Movements if nothing else can be done
  getAutomaticMoves() {
    const moves = this.getPlayerMoves()
    if (moves.length === 1 && (
      (isCustomMove(moves[0]) && (moves[0].type === CustomMoveType.SolveAttack))
      || (isMoveItem(moves[0]) && moves[0].itemType === MaterialType.FactionToken)
    )) {
      return moves
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...new AttackRule(this.game).getPlayerMoves())
    moves.push(...new MoveRules(this.game).getPlayerMoves())
    moves.push(...new ActionRule(this.game).getPlayerMoves())
    if (!this.remind<Attack[]>(Memory.Attacks).length && !this.remind<number[]>(Memory.MovedCards).length) {
      moves.push(this.rules().customMove(CustomMoveType.Pass, this.remind(Memory.IsInitiativeSequence)))
    }
    return moves
  }

  beforeItemMove(move: ItemMove) {
    return new MoveRules(this.game).beforeItemMove(move)
  }

  onCustomMove(move: CustomMove) {
    switch (move.type) {
      case CustomMoveType.Attack:
      case CustomMoveType.SolveAttack:
        return new AttackRule(this.game).onCustomMove(move)
      case CustomMoveType.Deactivate:
        return new MoveRules(this.game).onCustomMove(move)
      case CustomMoveType.PerformAction:
        return new ActionRule(this.game).onCustomMove(move)
      case CustomMoveType.Pass:
        return this.onPass()
    }
    return []
  }

  onPass() {
    if (this.remind(Memory.IsInitiativeSequence)) {
      return this.onEndInitiativeSequence()
    } else {
      const endOfTurnRule = new EndOfTurnRule(this.game)
      if (endOfTurnRule.cardsMoves.length > 0) {
        return [this.rules().startRule(RuleId.EndOfTurn)]
      } else {
        return endOfTurnRule.endPlayerTurn()
      }
    }
  }

  onEndInitiativeSequence() {
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.remind(Memory.StartPlayer)) {
      this.forget(Memory.IsInitiativeSequence)
    }
    return [this.rules().startPlayerTurn(RuleId.ActivationRule, nextPlayer)]
  }
}
