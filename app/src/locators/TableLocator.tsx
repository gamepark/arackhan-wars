/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class TableLocator extends ItemLocator {

  getPosition(item: MaterialItem, context: ItemContext) {
    switch (context.type) {
      case MaterialType.BattleMat:
        return { x: 0, y: 0, z: 0 }
      case MaterialType.RoundTracker:
        return { x: 50, y: 0, z: 0 }
    }
    return super.getPosition(item, context)
  }
}
