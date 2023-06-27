import { MaterialGameSetup } from '@gamepark/rules-api'
import { Faction } from './Faction'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { FactionCards } from './material/FactionCardType'
import { ArackhanWarsOptions } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsSetup extends MaterialGameSetup<Faction, MaterialType, LocationType, ArackhanWarsOptions> {
  locationsStrategies = locationsStrategies

  setupMaterial() {
    this.setupPlayers()
    this.placeRoundTracker()
    this.start()
  }

  setupPlayers() {
    this.players.forEach((player) => this.setupPlayer(player))
  }

  setupPlayer(player: Faction) {
    this.material(MaterialType.FactionCard)
      .createItems(
        Object.entries(FactionCards)
          .filter(([, { faction }]) => faction === player)
          .flatMap(([id, { faction, quantity = 1 }]) =>
            Array.from(Array(quantity)).map(() => ({
                id: { front: id, back: faction }, location: { type: LocationType.PlayerDeck, player: player }
              })
            )
          )
      )

    this.material(MaterialType.FactionCard).player(player).shuffle()

    this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
      .sort(item => -item.location.x!).limit(7)
      .moveItems({ location: { type: LocationType.Hand, player } })
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: 1, location: { type: LocationType.RoundTracker, x: 1 } })
  }


  start() {
    return {
      id: RuleId.StartRule
    }
  }
}
