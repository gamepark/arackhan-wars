/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { FactionCardTokenSpaceRules } from './FactionCardTokenSpaceRules'

export class FactionTokenSpaceDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  rules = FactionCardTokenSpaceRules
}
