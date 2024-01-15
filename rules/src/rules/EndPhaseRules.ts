import { MaterialMove, MaterialRulesPart, RuleMove, RuleMoveType } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { DiscardTiming } from '../material/cards/FactionCardCharacteristics'
import { Spell } from '../material/cards/Spell'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export const NUMBER_OF_ROUNDS = 9

export class EndPhaseRules extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      moves.push(...this.material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
        .player(player)
        .filter((_, index) => (getCardRule(this.game, index).characteristics as Spell)?.discardTiming === DiscardTiming.EndOfRound)
        .moveItems({ type: LocationType.PlayerDiscard, player })
      )
    }

    moves.push(...this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).rotation(true).rotateItems(false))

    const round = this.material(MaterialType.RoundTrackerToken).getItem()!.location.x!
    if (round === NUMBER_OF_ROUNDS) {
      moves.push(this.rules().endGame())
    } else {
      moves.push(this.material(MaterialType.RoundTrackerToken).moveItem(item => (
        { type: LocationType.RoundTracker, x: round + 1, rotation: !item.location.rotation }
      )))
      moves.push(this.rules().startRule(RuleId.DrawRule))
    }

    return moves
  }

  onRuleEnd(move: RuleMove) {
    if (move.type !== RuleMoveType.EndGame) {
      this.memorize(Memory.StartPlayer, player => this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length])
    }
    return []
  }
}
