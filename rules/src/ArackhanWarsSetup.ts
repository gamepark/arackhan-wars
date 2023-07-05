import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { FactionCards } from './material/FactionCardType'
import { ArackhanWarsOptions, PlayerId, PlayerOptions } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'
import shuffle from 'lodash/shuffle'
import { Faction, playerFactions } from './Faction'

export type GamePlayerMemory = {
  faction: Faction
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, ArackhanWarsOptions> {
  locationsStrategies = locationsStrategies

  setupMaterial(options: ArackhanWarsOptions) {
    this.setupFactions(options)
    this.setupPlayers()
    this.placeRoundTracker()
    this.start()
  }

  setupFactions(options: ArackhanWarsOptions) {
    if (Array.isArray(options.players)) {
      options.players.forEach((player, id) => {
        const faction = player.faction
        this.memorizeOnGame({ faction }, id + 1)
      })
    } else {
      const numberOfPlayers = options.players ?? 2
      const factions = shuffle(playerFactions)
      return Array.from(Array(numberOfPlayers).keys()).forEach((id) => {
        const playerId = id + 1
        const faction = factions[playerId]
        this.memorizeOnGame({ faction }, playerId)
      })
    }
  }

  setupPlayers() {
    this.game.players.forEach((playerId) => {
        console.log(playerId, this.game.playersMemory![playerId])
        this.setupPlayer(this.game.playersMemory![playerId] as PlayerOptions, playerId)
      }
    )
  }

  setupPlayer(player: PlayerOptions, playerId: PlayerId) {
    console.log(player)
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
