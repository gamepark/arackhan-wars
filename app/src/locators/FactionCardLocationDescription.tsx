/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { Location, MaterialMove, MoveKind } from '../../../../workshop/packages/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export class FactionCardLocationDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  alwaysVisible = false
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width

  getExtraCss() {
    return css`
      height: 100%;
      width: 100%;
      border-radius: inherit;
    `
  }

  isDropLocation = (move: MaterialMove, location: Location): boolean => {
    return move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Attack && (move.data.targets ?? []).includes(location.parent)
  }
}
