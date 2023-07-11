/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { FactionCardLocationDescription } from './FactionCardLocationDescription'

export class FactionCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new FactionCardLocationDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 50, y: 50 }
}
