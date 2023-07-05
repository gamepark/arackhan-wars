/** @jsxImportSource @emotion/react */
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { PlayerDeckDescription } from './PlayerDeckDescription'

export class PlayerDeckLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlayerDeckDescription()
  parentItemType = MaterialType.PlayMat

  delta = { x: -0.05, y: -0.05, z: 0.1 }
  hidden = true

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)
    if (index === 0) {
      return { x: 92.2, y: 90 }
    }

    return { x: 7.7, y: 9.9 }
  }

}
