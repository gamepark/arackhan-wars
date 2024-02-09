/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { GridLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { range } from 'lodash'
import difference from 'lodash/difference'
import { cardHeight, cardWidth, factionCardDescription } from '../material/FactionCardDescription'

export class BuildingDeckLocator extends GridLocator {
  locationDescription = new BuildingDeckDescription()

  coordinates = { x: 45, y: 0, z: 0 }

  itemsGap = { x: cardWidth + 1 }
  itemsPerLine = 6
  linesGap = { y: cardHeight + 1 }
}

class BuildingDeckDescription extends LocationDescription {
  width = cardWidth
  height = cardHeight
  borderRadius = factionCardDescription.borderRadius
  alwaysVisible = true

  getCoordinates(location: Location) {
    return {
      x: (location.x! % 6) * (cardWidth + 1) + 45,
      y: Math.floor(location.x! / 6) * (cardHeight + 1),
      z: 0
    }
  }

  extraCss = css`
    border: 1px solid white;
  `

  getLocations({ rules }: MaterialContext) {
    const xWithCard = rules.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems().map(item => item.location.x)
    return difference(range(0, 23), xWithCard).map(x => ({ type: LocationType.PlayerDeck, x }))
  }
}
