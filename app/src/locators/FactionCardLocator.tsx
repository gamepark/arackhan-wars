/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialMove, MoveKind, XYCoordinates } from '@gamepark/rules-api'
import { ItemLocator } from '@gamepark/react-game/dist/locators/ItemLocator'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css, Interpolation, Theme } from '@emotion/react'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export class FactionCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(): XYCoordinates {
    return { x: 50, y: 50 }
  }

  isDropLocation(move: MaterialMove, location: Location): boolean {
    return move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Attack && location.parent === move.data.target
  }

  isDragOnlyLocation(): boolean {
    return true
  }

  getLocationCss(): Interpolation<Theme> {
    return css`
      height: 100%;
      width: 100%;
      border-radius: inherit;
    `
  }
}
