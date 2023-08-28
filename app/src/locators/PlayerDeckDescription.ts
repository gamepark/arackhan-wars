/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerDeckDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = factionCardDescription.width + 1
  ratio = factionCardDescription.ratio
  borderRadius = 0.4
  alwaysVisible = false
  coordinates = { x: 0, y: 0, z: 10 }
}
