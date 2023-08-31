/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { factionTokenDescription } from '../material/FactionTokenDescription'

export class FactionTokenSpaceDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = factionTokenDescription.diameter
  ratio = 1
  borderRadius = this.width / 2
}
