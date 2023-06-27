/** @jsxImportSource @emotion/react */
import { ItemLocator, PlaceLocationContext } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { battlefieldSpaceCoordinates } from '@gamepark/arackhan-wars/material/spaces'
import { factionCardDescription } from '../material/FactionCardDescription'

export class BattlefieldLocator extends ItemLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getLocations(): Location<Faction, LocationType>[] {
    return battlefieldSpaceCoordinates.map((space) => ({
      type: LocationType.Battlefield,
      x: space.x,
      y: space.y
    }))
  }

  getLocationCss(_location: Location<Faction, LocationType, Node>) {
    return [locationCss]
  }

  getPositionOnParent(location: Location<Faction, LocationType>): XYCoordinates {
    return battlefieldSpaceCoordinates
      .find((space) => space.x === location.x && space.y === location.y)!
      .position!
  }

  isDragOnlyLocation(_location: Location<Faction, LocationType>, _context: PlaceLocationContext<Faction, MaterialType, LocationType>): boolean {
    return true
  }

  isHidden(item: MaterialItem<Faction, LocationType>): boolean {
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
