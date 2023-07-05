/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class BattlefieldDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  borderRadius = 0.2
  alwaysVisible = false
}
