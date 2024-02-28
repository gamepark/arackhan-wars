/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FactionCardLocationDescription } from './FactionCardLocationDescription'

export class FactionCardLocator extends ItemLocator {
  locationDescription = new FactionCardLocationDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(location: Location) {
    if (location.x !== undefined) {
      return { x: 20 + (location.x % 3) * 30, y: 20 + Math.floor(location.x / 3) * 15 }
    } else {
      return { x: 50, y: 50 }
    }
  }
}
