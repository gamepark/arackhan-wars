import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { factionTokenDescription } from '../material/FactionTokenDescription'

export class FactionTokenSpaceLocator extends Locator {
  locationDescription = new LocationDescription(factionTokenDescription)
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 49.7, y: 64.5 }
}
