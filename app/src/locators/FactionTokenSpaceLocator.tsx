/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { FactionTokenSpaceDescription } from './FactionTokenSpaceDescription'

export class FactionTokenSpaceLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new FactionTokenSpaceDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(): XYCoordinates {
    return { x: 49.7, y: 64.5 }
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>): boolean {
    return item.location.rotation
  }
}
