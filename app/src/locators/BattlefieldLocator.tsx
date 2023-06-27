/** @jsxImportSource @emotion/react */
import { ItemLocator, PlaceLocationContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { battlefieldSpaceCoordinates } from '@gamepark/arackhan-wars/material/spaces'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class BattlefieldLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getLocations(): Location<PlayerId, LocationType>[] {
    return battlefieldSpaceCoordinates.map((space) => ({
      type: LocationType.Battlefield,
      x: space.x,
      y: space.y
    }))
  }

  getLocationCss(_location: Location<PlayerId, LocationType, Node>) {
    return [locationCss]
  }

  getPositionOnParent(location: Location<PlayerId, LocationType>): XYCoordinates {
    return battlefieldSpaceCoordinates
      .find((space) => space.x === location.x && space.y === location.y)!
      .position!
  }

  isDragOnlyLocation(_location: Location<PlayerId, LocationType>, _context: PlaceLocationContext<PlayerId, MaterialType, LocationType>): boolean {
    return true
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>): boolean {
    return item.rotation?.y === 180
  }
}

const height = factionCardDescription.height
const width = height * factionCardDescription.ratio

const locationCss = css`
  height: ${height}em;
  width: ${width}em;
  border-radius: 0.2em;
`
