import { MaterialGameSetup } from '@gamepark/rules-api'
import { Faction } from './Faction'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { CardsByFaction } from './material/FactionCardType'
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
    this.players.forEach((player) => {
      this.material(MaterialType.FactionCard)
        .createItems(
          CardsByFaction[player]!.map((id) => ({
            id: { front: id, back: player }, location: { type: LocationType.PlayerDeck, player: player }
          })))

      this.material(MaterialType.FactionToken)
        .createItem({ id: player, location: { type: LocationType.PlayerArea, player: player }, quantity: 34 })

      this.material(MaterialType.RoundTrackerToken)
        .createItem({ id: 1, location: { type: LocationType.RoundTrackerSpace, x: 1 } })

      this.material(MaterialType.FactionCard).player(player).shuffle()

      this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
        .sort(item => -item.location.x!).limit(7)
        .moveItems({ location: { type: LocationType.Hand, player } })
    })
  }


  start(options: ArackhanWarsOptions) {
    return {
      id: RuleId.PlayerTurn,
      player: options.players[0].id,
      memory: { round: 1 }
    }
  }
}
