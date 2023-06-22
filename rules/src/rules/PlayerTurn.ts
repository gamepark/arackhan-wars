import { LocationType } from '../material/LocationType'
import { PlayerTurnRule } from '@gamepark/rules-api'
import { spaceCoordinates, startingSpaces } from '../material/spaces'
import { Faction } from '../Faction'
import { MaterialType } from '../material/MaterialType'

export class PlayerTurn extends PlayerTurnRule<Faction, MaterialType, LocationType> {

  getPlayerMoves() {
    const playerCards = this.material(MaterialType.FactionCard).location(LocationType.Hand).player(this.player)

    const hasRemainingStartingArea = startingSpaces.some((s) => {
      return !this.material(MaterialType.FactionCard)
        .location(LocationType.Space)
        .locationId(s)
        .length
    })

    if (hasRemainingStartingArea) {
      return startingSpaces.flatMap((index) => playerCards.moveItems({
        location: { type: LocationType.Space, id: index, player: this.player },
        rotation: { y: 180 }
      }))
    }
    
    return spaceCoordinates.flatMap((_, index) => {
      if (startingSpaces.includes(index)) {
        return []
      }

      return playerCards.moveItems({ location: { type: LocationType.Space, id: index, player: this.player }, rotation: { y: 180 } })
    })
  }
}
