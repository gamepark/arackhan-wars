/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class UnderCardLocator extends ItemLocator {
  parentItemType = MaterialType.FactionCard

  positionOnParent = { x: 50, y: 50 }

  getPosition(item: MaterialItem): Coordinates {
    const delta = item.location.x! + 1
    return { x: delta * 0.2, y: -delta, z: -delta * 0.01 }
  }
}
