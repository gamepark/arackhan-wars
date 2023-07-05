import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { FactionCards } from './material/FactionCardType'
import { ArackhanWarsOptions, PlayerId, PlayerOptions } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, ArackhanWarsOptions> {
  locationsStrategies = locationsStrategies

  setupMaterial(options: ArackhanWarsOptions) {
    this.setupPlayers(options)
    this.placeRoundTracker()
    this.start()
  }

  setupPlayers(options: ArackhanWarsOptions) {
    options.players.forEach((player, index) => this.setupPlayer(player, index + 1))
  }

  setupPlayer(player: PlayerOptions, playerId: PlayerId) {
    this.material(MaterialType.FactionCard)
      .createItems(
        Object.entries(FactionCards)
          .filter(([, { faction }]) => faction === player.faction)
          .flatMap(([id, { faction, quantity = 1 }]) =>
            Array.from(Array(quantity)).map(() => ({
                id: { front: id, back: faction }, location: { type: LocationType.PlayerDeck, player: playerId }
              })
            )
          )
      )

    this.material(MaterialType.FactionCard).player(playerId).shuffle()

    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(playerId)
      .sort(item => -item.location.x!)
      .limit(7)
      .moveItems({ location: { type: LocationType.Hand, player: playerId } })
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
