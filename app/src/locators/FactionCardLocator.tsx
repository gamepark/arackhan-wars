/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { FactionCardLocationDescription } from './FactionCardLocationDescription'

export class FactionCardLocator extends ItemLocator {
  locationDescription = new FactionCardLocationDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 50, y: 50 }
}
