/** @jsxImportSource @emotion/react */
import { PileLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'

export class PlayerTokenStockLocator extends PileLocator<Faction, MaterialType, LocationType> {
  rotate = true

  getCoordinates({ location }: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>): Coordinates {
    if (location.player === context.player) {
      return { x: 24, y: 18, z: 0 }
    }

    return { x: 35, y: -28, z: 0 }
  }

  getLocations(): Location<Faction, LocationType>[] {
    return [{
      type: LocationType.PlayerTokenStock
    }]
  }

  getRadius(): number {
    return 3
  }

  getPileId(item: MaterialItem<Faction, LocationType>): number {
    return item.id
  }
}
