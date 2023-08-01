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
import { deactivateTokens } from '../utils/activation.utils'
import { FactionCardInspector } from './cards/rules/helper/FactionCardInspector'
import { ActionRule } from './cards/rules/base/ActionRule'
import { Memory } from './Memory'

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
    console.time()
    const cardInspector = new FactionCardInspector(this.game)
    //const activatedCards = this.remind<ActivatedCard[]>(Memory.ActivatedCards)

    const moves: MaterialMove[] = []
    moves.push(...new AttackRule(this.game, cardInspector).getPlayerMoves())

    // TODO: in practice, move can be done only if the card can attack after being moves
    // TODO: into MoveRules, check if after movement, the card can attack in grouped attack
    //if (!activatedCards.some((a) => a.targets)) {
    moves.push(...new MoveRules(this.game, cardInspector).getPlayerMoves())
    //}

    moves.push(...new ActionRule(this.game, cardInspector).getPlayerMoves())


    /**if (rule.actionRule().length) {
        moves.push(this.rules().customMove(CustomMoveType.CardAction, { card: index }))
      }**/

    moves.push(this.rules().customMove(CustomMoveType.Pass))
    console.timeEnd()
    return moves
  }

  get nextRuleMove(): MaterialMove {
    if (this.player === this.remind(Memory.StartPlayer)) {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    } else {
      return this.rules().startRule(RuleId.EndPhaseRule)
    }
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
    }
    // Apply end turn effect on card
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
      case CustomMoveType.Pass:
        return [this.nextRuleMove]
    }

    /*if (move.type === CustomMoveType.CardAction) {
      const rule = getFactionCardRule(this.game, move.data.card)
      return rule.actionRule()
    }*/

    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []

    if (move.position.location?.type === LocationType.Battlefield) {

      const cardInspector = new FactionCardInspector(this.game)
      const moves: MaterialMove[] = new MoveRules(this.game, cardInspector).afterItemMove(move)

      // After a move, if there is no attack (TODO: or action) possible, deactivate token
      const attackMoves = new AttackRule(this.game, cardInspector).getPlayerMoves()
      if (!attackMoves.length) {
        const token = this.material(MaterialType.FactionToken).parent(move.itemIndex)
        moves.push(...deactivateTokens(token))
      }

      return moves
    }

    return []
  }
}
