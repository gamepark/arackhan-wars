/** @jsxImportSource @emotion/react */
import { PileLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerTokenStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  rotate = true

  getCoordinates({ location }: MaterialItem, context: ItemContext): Coordinates {
    if (location.player === context.player) {
      return { x: 24, y: 18, z: 0 }
    }

    return { x: 35, y: -28, z: 0 }
  }

  getLocations(): Location<PlayerId, LocationType>[] {
    return [{
      type: LocationType.PlayerTokenStock
    }]
  }

  getRadius(): number {
    return 3
  }

  getPileId(item: MaterialItem): number {
    return item.id
  }
}
