/** @jsxImportSource @emotion/react */
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { PlayerDiscardDescription } from './PlayerDiscardDescription'

export class PlayerDiscardLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlayerDiscardDescription()
  parentItemType = MaterialType.PlayMat

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)

    if (index === 0) {
      return { x: 8.4, y: 90 }
    }

    return { x: 91.4, y: 9.85 }
  }
}
