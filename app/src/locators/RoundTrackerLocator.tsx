/** @jsxImportSource @emotion/react */
import { ItemLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class RoundTrackerLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.RoundTracker

  getPosition(_item: MaterialItem<PlayerId, LocationType>, context: PlaceItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const round = context.game.memory?.round ?? 1
    const additionalX = ((round - 1) * 2.83)
    return { x: -11.4 + additionalX, y: 0, z: 0 }
  }
}
