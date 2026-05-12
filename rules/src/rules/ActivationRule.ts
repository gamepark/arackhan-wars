import { CustomMove, isCustomMove, isMoveItem, isStartPlayerTurn, isStartRule, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { DiscardTiming } from '../material/cards/FactionCardCharacteristics'
import { Spell } from '../material/cards/Spell'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionRule } from './ActionRule'
import { Attack, AttackRule } from './AttackRule'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { MoveRules } from './MoveRules'
import { RuleId } from './RuleId'

export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {

  onRuleStart(move: RuleMove) {
    if (isStartPlayerTurn(move)) {
      this.memorize(Memory.MovedCards, [])
      this.memorize(Memory.Attacks, [])
      this.memorize(Memory.TurnEffects, [])

      // If we know all the cards in the player's hand, we know all the legal moves. If there is only 1 legal move (pass), automatically play it.
      const playerCards = this.material(MaterialType.FactionCard).location(LocationType.Hand).player(this.player).getItems()
      if (playerCards.every(card => card.id.front !== undefined)) {
        const moves = this.getPlayerMoves()
        if (moves.length === 1) {
          return moves
        }
      }
    }
    return []
  }

  getAutomaticMoves() {
    const moves = this.getPlayerMoves()
    if (moves.length === 1 && (
      (isCustomMove(moves[0]) && moves[0].type === CustomMoveType.SolveAttack)
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
      moves.push(this.rules().customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove) {
    return new MoveRules(this.game).beforeItemMove(move)
  }

  onRuleEnd(move: RuleMove) {
    if (this.remind(Memory.IsInitiativeSequence)) {
      if (isStartPlayerTurn(move) && move.player === this.remind(Memory.StartPlayer)) {
        this.forget(Memory.IsInitiativeSequence)
      }
    } else {
      if (isStartPlayerTurn(move) || (isStartRule(move) && move.id === RuleId.EndPhaseRule)) {
        return this.onEndOfTurn()
      }
    }
    return []
  }

  onEndOfTurn() {
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .filter((_, index) => (getCardRule(this.game, index).characteristics as Spell)?.discardTiming === DiscardTiming.ActivationOrEndOfTurn)
      .moveItems({ type: LocationType.PlayerDiscard, player: this.player })
  }

  onCustomMove(move: CustomMove) {
    switch (move.type) {
      case CustomMoveType.Attack:
      case CustomMoveType.SolveAttack:
        return new AttackRule(this.game).onCustomMove(move)
      case CustomMoveType.PerformAction:
        this.memorize(Memory.ActionCard, move.data)
        return [this.rules().startRule(getCardRule(this.game, move.data).characteristics!.action!)]
      case CustomMoveType.Pass:
        return [this.nextRuleMove]
    }
    return []
  }

  get nextRuleMove() {
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.remind(Memory.StartPlayer) && !this.remind(Memory.IsInitiativeSequence)) {
      return this.rules().startRule(RuleId.EndPhaseRule)
    } else {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, nextPlayer)
    }
  }
}
