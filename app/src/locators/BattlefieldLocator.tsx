/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { BattlefieldDescription } from './BattlefieldDescription'

export class BattlefieldLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new BattlefieldDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location<PlayerId, LocationType>): XYCoordinates {
    return { x: location.x! * 11.35 + 10.2, y: location.y! * 15.8 + 10.5 }
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>): boolean {
    return item.location.rotation
  }
}

export const battleFieldLocator = new BattlefieldLocator()
