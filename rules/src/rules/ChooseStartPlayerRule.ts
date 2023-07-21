import { LocationType } from '../material/LocationType'
import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'

export class ChooseStartPlayerRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    return this.game.players.map(startPlayer => this.rules().startSimultaneousRule(RuleId.Mulligan, { memory: { startPlayer } }))
  }
}
