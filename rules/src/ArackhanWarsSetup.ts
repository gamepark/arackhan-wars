import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { ArackhanWarsOptions, PlayerId } from './ArackhanWarsOptions'
import { RuleId } from './rules/RuleId'
import { locationsStrategies } from './material/LocationStrategies'
import { Faction, playerFactions } from './material/Faction'
import { PreBuildDecks } from './material/cards/PreBuildDecks'
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
    const availableFactionTokens = [...playerFactions]
    for (let index = 0; index < options.players.length; index++) {
      const player = options.players[index]
      const playerId = index + 1
      if (availableFactionTokens.includes(player.faction)) {
        this.memorize(Memory.Token, player.faction, playerId)
        availableFactionTokens.splice(availableFactionTokens.indexOf(player.faction), 1)
      } else {
        this.memorize(Memory.Token, TokenFaction.Neutral, playerId)
      }
      this.setupPlayer(playerId, player.faction)
    }
  }

  setupPlayer(player: number, faction: Faction) {
    this.createPlayerDeck(player, faction)
    this.shufflePlayerDeck(player)
    this.draw(player)
  }

  createPlayerDeck(player: number, faction: Faction) {
    this.material(MaterialType.FactionCard).createItems(
      PreBuildDecks[faction].map(card => ({ id: { front: card, back: faction }, location: { type: LocationType.PlayerDeck, player } }))
    )
  }

  shufflePlayerDeck(player: number) {
    this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player).shuffle()
  }

  draw(player: number, quantity = START_HAND) {
    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(player)
      .sort(card => -card.location.x!)
      .limit(quantity)
      .moveItems({ location: { type: LocationType.Hand, player } })
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: 1, location: { type: LocationType.RoundTracker, x: 1 } })
  }

  start() {
    return { id: RuleId.ChooseStartPlayer, player: this.game.players[0] }
  }
}
