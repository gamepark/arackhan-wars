/** @jsxImportSource @emotion/react */
import { BaseContext, DeckLocator } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, XYCoordinates } from '@gamepark/rules-api'

export class PlayerDeckLocator extends DeckLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getPositionOnParent(location: Location<Faction, LocationType>, context: BaseContext<Faction, MaterialType, LocationType>): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)
    if (index === 0) {
      return { x: 92.2, y: 90 }
    }

    return { x: 7.7, y: 9.9 }
  }


  getDelta() {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  isHidden(): boolean {
    return true
  }
}
