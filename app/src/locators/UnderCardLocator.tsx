/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class UnderCardLocator extends ListLocator {
  parentItemType = MaterialType.FactionCard
  gap = { x: 0.2, y: -1, z: -0.01 }
  getLocationIndex = ({ x = 0 }: Location) => x + 1
}
