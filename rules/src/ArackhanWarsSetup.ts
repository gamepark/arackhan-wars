import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArackhanWarsOptions } from './ArackhanWarsOptions'
import { ArackhanWarsRules } from './ArackhanWarsRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { START_HAND } from './rules/MulliganRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsSetup extends MaterialGameSetup<number, MaterialType, LocationType, ArackhanWarsOptions> {
  Rules = ArackhanWarsRules

  setupMaterial() {
    this.placeRoundTracker()
  }

  draw(player: number, quantity = START_HAND) {
    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(player)
      .sort(card => -card.location.x!)
      .limit(quantity)
      .moveItems({ type: LocationType.PlayerHand, player })
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: 1, location: { type: LocationType.RoundTracker, x: 1 } })
  }

  start() {
    this.startSimultaneousRule(RuleId.ChooseFaction)
  }
}
