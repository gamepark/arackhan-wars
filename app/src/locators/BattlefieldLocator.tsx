/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { BattlefieldDescription } from './BattlefieldDescription'

export class BattlefieldLocator extends ItemLocator {
  locationDescription = new BattlefieldDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location, {player}: MaterialContext) {
    const x = player === 2 ? 7 - location.x! : location.x!
    const y = player === 2 ? 5 - location.y! : location.y!
    return { x: x * 11.35 + 10.2, y: y * 15.8 + 10.5 }
  }
}

export const battleFieldLocator = new BattlefieldLocator()
