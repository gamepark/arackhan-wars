/** @jsxImportSource @emotion/react */
import { ItemLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

export class TableLocator extends ItemLocator<Faction, MaterialType, LocationType> {

  getPosition(item: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>): Coordinates {
    switch (context.type) {
      case MaterialType.PlayMat:
        return { x: -10, y: -5, z: 0 }
      case MaterialType.RoundTracker:
        return { x: 21.3, y: -20.6, z: 0 }
    }

    return super.getPosition(item, context)
  }

  getRotation(_item: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>): number {
    if (context.type === MaterialType.RoundTracker) {
      return 90
    }

    return 0
  }
}
