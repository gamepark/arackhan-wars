/** @jsxImportSource @emotion/react */
import { MaterialContext, ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { AstralPlaneDescription } from './AstralPlaneDescription'

export class AstralPlaneLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new AstralPlaneDescription()
  parentItemType = MaterialType.PlayMat


  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const width = factionCardDescription.width
    const index = this.getRelativePlayerIndex(context, location.player!)
    if (index === 0) {
      return { x: 68.3 + ((location.x!) * (width + 5.3)), y: 90 }
    }

    return { x: 31.55 - ((location.x!) * (width + 5.3)), y: 9.85 }

  }

  isHidden(item: MaterialItem): boolean {
    return item.rotation?.y === 1
  }
}
