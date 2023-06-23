import { LocationType } from '../material/LocationType'
import { PlayerTurnRule } from '@gamepark/rules-api'
import { battlefieldSpaceCoordinates, startingSpaces } from '../material/spaces'
import { Faction } from '../Faction'
import { MaterialType } from '../material/MaterialType'

export class PlayerTurn extends PlayerTurnRule<Faction, MaterialType, LocationType> {

  getPlayerMoves() {
    const playerCards = this.material(MaterialType.FactionCard).location(LocationType.Hand).player(this.player)

    const hasRemainingStartingArea = startingSpaces.some((s) => {
      return !this.material(MaterialType.FactionCard)
        .location(LocationType.Battlefield)
        .locationId(s)
        .length
    })

    if (hasRemainingStartingArea) {
      return startingSpaces.flatMap((index) => {
        const space = battlefieldSpaceCoordinates[index]

        return playerCards.moveItems({
          location: {
            type: LocationType.Battlefield,
            player: this.player,
            x: space.x,
            y: space.y
          },
          rotation: { y: 180 }
        })
      })
    }

    return battlefieldSpaceCoordinates.flatMap((space, index) => {
      if (startingSpaces.includes(index)) {
        return []
      }

      return playerCards.moveItems({
        location: {
          type: LocationType.Battlefield,
          x: space.x,
          y: space.y,
          player: this.player
        },
        rotation: { y: 180 }
      })
    })
  }
}
