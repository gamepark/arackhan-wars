import { PlayerTurnRule } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { CustomMoveType } from '../material/CustomMoveType'
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
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length === 1) return movedCards
    if (this.remind<Attack[]>(Memory.Attacks).length > 0 || movedCards.length > 1) return []
    const oncePerRound = this.remind<number[]>(Memory.OncePerRound) ?? []
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes().filter(index => !oncePerRound.includes(index))
  }
}
