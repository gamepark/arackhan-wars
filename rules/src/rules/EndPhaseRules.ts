import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'
import { Spell } from './cards/descriptions/base/Spell'
import { DiscardTiming } from './cards/descriptions/base/FactionCardCharacteristics'
import { getCardRule } from './cards/rules/base/CardRule'
import { Memory } from './Memory'
import { onBattlefieldAndAstralPlane } from '../material/Board'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      moves.push(...this.material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
        .player(player)
        .filter((_, index) => (getCardRule(this.game, index).characteristics as Spell).discardTiming === DiscardTiming.EndOfRound)
        .moveItems({ location: { type: LocationType.PlayerDiscard, player } })
      )
    }

    moves.push(...this.material(MaterialType.FactionToken)
      .location(LocationType.FactionTokenSpace)
      .rotation(rotation => rotation?.y === 1)
      .moveItems({ rotation: {} }))

    const turn = this.material(MaterialType.RoundTrackerToken).getItem()!.location.x!
    if (turn === 9) {
      moves.push(this.rules().endGame())
    } else {
      moves.push(this.material(MaterialType.RoundTrackerToken).moveItem({ location: { type: LocationType.RoundTracker, x: turn + 1 } }))
      moves.push(this.rules().startRule(RuleId.DrawRule))
    }

    return moves
  }

  onRuleEnd() {
    this.memorize(Memory.StartPlayer, player => this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length])
    return []
  }
}
