/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class RoundTrackerLocator extends ItemLocator {
  parentItemType = MaterialType.RoundTracker

  getPositionOnParent(location: Location) {
    return { x: 6.85 + (location.x! - 1) * 10.78, y: 50 }
  }
}
