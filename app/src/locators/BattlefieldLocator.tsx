/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { BattlefieldDescription } from './BattlefieldDescription'

export class BattlefieldLocator extends ItemLocator {
  locationDescription = new BattlefieldDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location) {
    return { x: location.x! * 11.35 + 10.2, y: location.y! * 15.8 + 10.5 }
  }
}

export const battleFieldLocator = new BattlefieldLocator()
