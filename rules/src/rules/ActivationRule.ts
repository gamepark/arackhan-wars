import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { ActivationRuleMemory } from './types'
import { DiscardTiming } from './cards/descriptions/base/FactionCardDetail'
import { AttackRule } from './cards/rules/base/AttackRule'
import { MoveRules } from './cards/rules/base/MoveRules'
import { discardSpells } from '../utils/discard.utils'
import { deactivateTokens } from '../utils/activation.utils'
import { FactionCardEffectHelper } from './cards/rules/helper/FactionCardEffectHelper'


export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves() {
    const remainingMoves = this.getPlayerMoves()
    if (remainingMoves.length !== 1 || !isCustomMoveType(CustomMoveType.SolveAttack)(remainingMoves[0])) return []
    return [remainingMoves[0]]
  }

  getPlayerMoves(): MaterialMove[] {
    const effectHelper = new FactionCardEffectHelper(this.game)
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    const moves: MaterialMove[] = []
    moves.push(...new AttackRule(this.game, effectHelper).getPlayerMoves())

    if (!activatedCards.some((a) => a.targets)) {
      moves.push(...new MoveRules(this.game, effectHelper).getPlayerMoves())
    }

    moves.push(this.endTurnMove())
    return moves
  }

  endTurnMove = (): MaterialMove => {
    if (this.player == this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.EndPhaseRule, this.nextPlayer)
    }

    return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []

    if (move.position.location?.type === LocationType.Battlefield || move.position.location?.type === LocationType.PlayerDiscard) {
      return new MoveRules(this.game).beforeItemMove(move)
    }

    return []
  }


  onRuleEnd(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    // Apply end turn effect on card
    return discardSpells(
      this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
        .player(this.player),
      DiscardTiming.ActivationOrEndOfTurn
    )
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack || move.type === CustomMoveType.SolveAttack) {
      return new AttackRule(this.game).onCustomMove(move)
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

      const effectHelper = new FactionCardEffectHelper(this.game)
      const moves: MaterialMove[] = new MoveRules(this.game, effectHelper).afterItemMove(move)

      // After a move, if there is no attack (TODO: or action) possible, deactivate token
      const attackMoves = new AttackRule(this.game, effectHelper).getPlayerMoves()
      if (!attackMoves.length) {
        const token = this.material(MaterialType.FactionToken).parent(move.itemIndex)
        moves.push(...deactivateTokens(token))
      }

      return moves
    }

    return []
  }
}
