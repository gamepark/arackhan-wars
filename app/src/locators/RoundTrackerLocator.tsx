import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class RoundTrackerLocator extends Locator {
  parentItemType = MaterialType.RoundTracker
  getPositionOnParent = (location: Location) => ({ x: 6.85 + (location.x! - 1) * 10.78, y: 50 })
}
