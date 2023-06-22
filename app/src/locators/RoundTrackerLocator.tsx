/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

export class RoundTrackerLocator extends ItemLocator<Faction, MaterialType, LocationType> {

  getPosition(): Coordinates {
    return { x: 21.3, y: -20.6, z: 0 }
  }

  getRotation(): number {
    return 90
  }
}
