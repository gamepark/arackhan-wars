import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DrawRules extends MaterialRulesPart {

  onRuleStart() {
    return [
      ...this.game.players.flatMap(player =>
        this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
          .deck().deal({ type: LocationType.PlayerHand, player }, 2)),
      this.startRule(RuleId.PlacementRule)
    ]
  }
}
