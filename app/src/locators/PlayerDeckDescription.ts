/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerDeckDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio + 1
  width = factionCardDescription.width + 1
  borderRadius = 0.2
  alwaysVisible = false

  getExtraCss() {
    return css`
      transform: translate3d(-50%, -50%, 30em);
    `
  }
}
