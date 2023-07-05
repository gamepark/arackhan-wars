/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldSpaceCoordinates } from '@gamepark/arackhan-wars/material/spaces'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { BattlefieldDescription } from './BattlefieldDescription'

export class BattlefieldLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new BattlefieldDescription()
  parentItemType = MaterialType.PlayMat

  getPositionOnParent(location: Location<PlayerId, LocationType>): XYCoordinates {
    return battlefieldSpaceCoordinates
      .find((space) => space.x === location.x && space.y === location.y)!
      .position!
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>): boolean {
    return item.rotation?.y === 1
  }
}
