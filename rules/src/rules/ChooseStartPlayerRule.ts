import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseStartPlayerRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.game.players.map(player => this.rules().customMove(CustomMoveType.ChoosePlayer, player))
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.ChoosePlayer) {
      this.memorize(Memory.StartPlayer, move.data)
      return [this.rules().startSimultaneousRule(RuleId.Mulligan)]
    }
    return []
  }
}
