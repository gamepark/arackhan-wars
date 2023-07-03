/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class RoundTrackerLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.RoundTracker

  getPositionOnParent(location: Location): XYCoordinates {
    const round = location.x!

    const additionalX = ((round) * 9)
    return { x: 6.85 + additionalX, y: 50 }
  }
}
