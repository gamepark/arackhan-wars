import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { ArackhanWarsOptions, PlayerId } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'
import { Faction, playerFactions } from './Faction'
import { PreBuildDecks } from './rules/cards/PreBuildDecks'
import { Memory } from './rules/Memory'
import { TokenFaction } from './material/TokenFaction'

export const START_HAND = 7

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
    const availableFactions = [...playerFactions]
    for (let index = 0; index < options.players.length; index++) {
      const player = options.players[index]
      const playerId = index + 1
      const faction = player.faction ?? availableFactions[Math.floor(Math.random() * availableFactions.length)]
      if (availableFactions.includes(faction)) {
        this.memorize(Memory.Token, faction, playerId)
        availableFactions.splice(availableFactions.indexOf(faction), 1)
      } else {
        this.memorize(Memory.Token, TokenFaction.Neutral, playerId)
      }
      this.setupPlayer(playerId, faction)
    }
  }

  setupPlayer(player: number, faction: Faction) {
    this.material(MaterialType.FactionCard)
      .createItems(
        Object.entries(PreBuildDecks[faction])
          .flatMap(([id, quantity]) =>
            Array.from(Array(quantity)).map(() => ({
                id: { front: parseInt(id), back: faction }, location: { type: LocationType.PlayerDeck, player }
              })
            )
          )
      )

    this.material(MaterialType.FactionCard).player(player).shuffle()

    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(player)
      .sort(card => -card.location.x!)
      .limit(START_HAND)
      .moveItems({ location: { type: LocationType.Hand, player: player } })
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: 1, location: { type: LocationType.RoundTracker, x: 1 } })
  }

  start() {
    return { id: RuleId.ChooseStartPlayer, player: this.game.players[0] }
  }
}
