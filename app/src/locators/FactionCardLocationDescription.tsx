/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { isCustomMove, Location, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export class FactionCardLocationDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  alwaysVisible = false

  getExtraCss() {
    return css`
      height: 100%;
      width: 100%;
      border-radius: inherit;
    `
  }

  canDrop(move: MaterialMove, location: Location) {
    return isCustomMove(move) && move.type === CustomMoveType.Attack && Array.isArray(move.data.targets) && move.data.targets.includes(location.parent)
  }
}
