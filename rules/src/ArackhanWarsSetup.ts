import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { ArackhanWarsOptions, PlayerId } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'
import shuffle from 'lodash/shuffle'
import { Faction, playerFactions } from './Faction'
import { PreBuildDecks } from './rules/cards/PreBuildDecks'
import { Memory } from './rules/Memory'

export const START_HAND = 7

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
      options.players.forEach((player, index) => {
        const faction = player.faction
        this.memorize(Memory.Faction, faction, index + 1)
      })
    } else {
      const numberOfPlayers = options.players ?? 2
      const factions = shuffle(playerFactions)
      return Array.from(Array(numberOfPlayers).keys()).forEach((id) => {
        const playerId = id + 1
        const faction = factions[playerId]
        this.memorize(Memory.Faction, faction, playerId)
      })
    }
  }

  setupPlayers() {
    this.game.players.forEach((playerId) => {
        this.setupPlayer(playerId)
      }
    )
  }

  getFaction(playerId: number) {
    return this.getMemory(playerId).remind<Faction>(Memory.Faction)
  }

  setupPlayer(playerId: PlayerId) {
    const faction = this.getFaction(playerId)
    this.material(MaterialType.FactionCard)
      .createItems(
        Object.entries(PreBuildDecks[faction])
          .flatMap(([id, quantity]) =>
            Array.from(Array(quantity)).map(() => ({
                id: { front: parseInt(id), back: faction }, location: { type: LocationType.PlayerDeck, player: playerId }
              })
            )
          )
      )

    this.material(MaterialType.FactionCard).player(playerId).shuffle()

    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(playerId)
      .sort(card => -card.location.x!)
      .limit(START_HAND)
      .moveItems({ location: { type: LocationType.Hand, player: playerId } })
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: 1, location: { type: LocationType.RoundTracker, x: 1 } })
  }

  start() {
    return { id: RuleId.ChooseStartPlayer, player: this.game.players[0] }
  }
}
