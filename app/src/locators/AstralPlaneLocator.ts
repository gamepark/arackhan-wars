/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'
import { AstralPlaneDescription } from './AstralPlaneDescription'

export class AstralPlaneLocator extends ItemLocator {
  locationDescription = new AstralPlaneDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location, context: MaterialContext) {
    const bottomPlayerId = context.player ?? 1
    const deltaX = location.x! * (factionCardDescription.width + 5.3)
    return location.player === bottomPlayerId ? { x: 68.3 + deltaX, y: 90 } : { x: 31.55 - deltaX, y: 9.85 }
  }
}
