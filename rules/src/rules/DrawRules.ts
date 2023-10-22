import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DrawRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const drawCards = this.game.players.flatMap((player) => (
      this
        .material(MaterialType.FactionCard)
        .location(LocationType.PlayerDeck)
        .player(player)
        .sort(card => -card.location.x!)
        .limit(2)
        .moveItems({ type: LocationType.Hand, player })
    ))

    return [
      ...drawCards,
      this.rules().startRule(RuleId.PlacementRule)
    ]
  }
}
