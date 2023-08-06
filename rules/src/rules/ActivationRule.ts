import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import {
  CustomMove,
  isCustomMoveType,
  isMoveItemType,
  isStartPlayerTurn,
  isStartRule,
  ItemMove,
  MaterialMove,
  PlayerTurnRule,
  RuleMove
} from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { DiscardTiming } from './cards/descriptions/base/FactionCardCharacteristics'
import { AttackRule } from './cards/rules/base/AttackRule'
import { MoveRules } from './cards/rules/base/MoveRules'
import { discardSpells } from '../utils/discard.utils'
import { ActionRule } from './cards/rules/base/ActionRule'
import { Memory } from './Memory'
import { getCardRule } from './cards/rules/base/CardRule'

export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {

  onRuleStart<RuleId extends number>(move: RuleMove<PlayerId, RuleId>) {
    if (isStartPlayerTurn(move)) {
      this.memorize(Memory.ActivatedCards, [])
      this.memorize(Memory.TurnEffects, [])
    }
    return []
  }

  getAutomaticMoves() {
    const remainingMoves = this.getPlayerMoves()
    if (remainingMoves.length !== 1 || !isCustomMoveType(CustomMoveType.SolveAttack)(remainingMoves[0])) return []
    return [remainingMoves[0]]
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...new AttackRule(this.game).getPlayerMoves())
    moves.push(...new MoveRules(this.game).getPlayerMoves())
    moves.push(...new ActionRule(this.game).getPlayerMoves())
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []

    if (move.position.location?.type === LocationType.Battlefield || move.position.location?.type === LocationType.PlayerDiscard) {
      return new MoveRules(this.game).beforeItemMove(move)
    }

    return []
  }

  onRuleEnd(move: RuleMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (isStartRule(move) && move.id === RuleId.EndPhaseRule) {
      this.memorize(Memory.StartPlayer, this.player)
      return this.onEndOfTurn()
    } else if (isStartPlayerTurn(move) && move.id === RuleId.ActivationRule) {
      return this.onEndOfTurn()
    }
    return []
  }

  onEndOfTurn(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    this.forget(Memory.TurnEffects)
    return discardSpells(this.game,
      this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
        .player(this.player),
      DiscardTiming.ActivationOrEndOfTurn
    )
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    switch (move.type) {
      case CustomMoveType.Attack:
      case CustomMoveType.SolveAttack:
        return new AttackRule(this.game).onCustomMove(move)
      case CustomMoveType.PerformAction:
        this.memorize(Memory.ActionCard, move.data)
        return [this.rules().startRule(getCardRule(this.game, move.data).characteristics.action!)]
      case CustomMoveType.Pass:
        return [this.nextRuleMove]
    }
    return []
  }

  get nextRuleMove(): MaterialMove {
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.remind(Memory.StartPlayer)) {
      if (this.remind(Memory.IsInitiativeSequence)) {
        this.forget(Memory.IsInitiativeSequence)
      } else {
        return this.rules().startRule(RuleId.EndPhaseRule)
      }
    }
    return this.rules().startPlayerTurn(RuleId.ActivationRule, nextPlayer)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []

    if (move.position.location?.type === LocationType.Battlefield) {
      return new MoveRules(this.game).afterItemMove(move)
    }

    return []
  }
}
