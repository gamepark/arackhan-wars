import { LocationType } from '../material/LocationType'
import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { Memory } from './Memory'
import { CustomMoveType } from '../material/CustomMoveType'

export class ChooseStartPlayerRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    return this.game.players.map(player => this.rules().customMove(CustomMoveType.ChoosePlayer, player))
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.ChoosePlayer) {
      this.memorize(Memory.StartPlayer, move.data)
      return [this.rules().startSimultaneousRule(RuleId.Mulligan)]
    }
    return []
  }
}
