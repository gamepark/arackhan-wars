/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { FactionTokenSpaceDescription } from './FactionTokenSpaceDescription'

export class FactionTokenSpaceLocator extends ItemLocator {
  locationDescription = new FactionTokenSpaceDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent() {
    return { x: 49.7, y: 64.5 }
  }
}
