/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { spaceCoordinates } from '@gamepark/arackhan-wars/material/spaces'
import { factionCardDescription } from '../material/FactionCardDescription'

export class SpaceLocator extends ItemLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.Battlefield

  getParentItemLocations(): Location<Faction, LocationType>[] {
    return spaceCoordinates.map((_, id) => ({ type: LocationType.Space, id }))
  }

  getLocationCss(_location: Location<Faction, LocationType, Node>) {
    return [locationCss]
  }

  getPositionOnParent(location: Location<Faction, LocationType>): XYCoordinates {
    return spaceCoordinates[location.id!]
  }

  isHidden(item: MaterialItem<Faction, LocationType>): boolean {
    return item.rotation?.y !== undefined
  }
}

const height = factionCardDescription.height
const width = height * factionCardDescription.ratio

const locationCss = css`
  height: ${height}em;
  width: ${width}em;
  border-radius: 0.2em;
`
