/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerDeckDescription } from './PlayerDeckDescription'

export class PlayerDeckLocator extends DeckLocator {
  locationDescription = new PlayerDeckDescription()
  parentItemType = MaterialType.BattleMat

  delta = { x: -0.04, y: -0.04, z: 0.1 }

  getPositionOnParent(location: Location, context: MaterialContext) {
    const bottomPlayerId = context.player ?? 1
    return location.player === bottomPlayerId ? { x: 92.2, y: 90 } : { x: 7.7, y: 9.9 }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const bottomPlayerId = context.player ?? 1
    return item.location.player === bottomPlayerId ? 0 : 180
  }
}
