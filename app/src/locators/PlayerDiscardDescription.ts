/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { PlayerDiscardRules } from './PlayerDiscardRules'
import discard from '../images/locations/discard.png'

export class PlayerDiscardDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = factionCardDescription.width + 0.2
  ratio = 790 / 1102
  borderRadius = 0.4
  alwaysVisible = true
  coordinates = { x: 0, y: 0, z: 10 }

  rules = PlayerDiscardRules
  rulesImage = discard
}
