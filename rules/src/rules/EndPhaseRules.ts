import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { isSpell } from './cards/descriptions/base/Spell'
import { DiscardTiming } from './cards/descriptions/base/FactionCardCharacteristics'
import { discardCard } from '../utils/discard.utils'
import { getCardRule } from './cards/rules/base/CardRule'
import { Memory } from './Memory'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const battlefieldCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const moves: MaterialMove[] = []
    for (const index of battlefieldCards.getIndexes()) {
      const cardMaterial = this.material(MaterialType.FactionCard).index(index)!
      const card = getCardRule(this.game, index).characteristics

      if (isSpell(card) && card.discardTiming === DiscardTiming.EndOfRound) {
        moves.push(...discardCard(cardMaterial))
      }
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
