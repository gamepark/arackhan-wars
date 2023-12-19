import { isDeadEndMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ArackhanWarsRules } from '../ArackhanWarsRules'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { CustomMoveType } from '../material/CustomMoveType'
import { MaterialType } from '../material/MaterialType'
import { Attack } from './AttackRule'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.availableCards
      .filter(index => getCardRule(this.game, index).canPerformAction)
      .map(index => this.rules().customMove(CustomMoveType.PerformAction, index))
      .filter(move => !isDeadEndMove(move, this.game, ArackhanWarsRules, game => game.rule?.id === RuleId.ActivationRule))
  }

  get availableCards() {
    if (this.remind<Attack[]>(Memory.Attacks).length > 0) return []
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length === 1) {
      return movedCards
    }
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes()
  }
}
