/** @jsxImportSource @emotion/react */
import { ItemLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

export class RoundTrackerLocator extends ItemLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.RoundTracker

  getPosition(_item: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>): Coordinates {
    const round = context.game.memory?.round ?? 1
    const additionalX = ((round - 1) * 2.83)
    return { x: -11.4 + additionalX, y: 0, z: 0 }
  }
}
