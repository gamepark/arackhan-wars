/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerDiscardDescription } from './PlayerDiscardDescription'

export class PlayerDiscardLocator extends DeckLocator {
  locationDescription = new PlayerDiscardDescription()
  parentItemType = MaterialType.BattleMat
  hidden = false

  getPositionOnParent(location: Location, context: MaterialContext) {
    const bottomPlayerId = context.player ?? 1
    return location.player === bottomPlayerId ? { x: 8.4, y: 90 } : { x: 91.4, y: 9.85 }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const bottomPlayerId = context.player ?? 1
    return item.location.player === bottomPlayerId ? 0 : 180
  }
}
