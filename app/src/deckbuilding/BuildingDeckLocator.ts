/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { range } from 'lodash'
import difference from 'lodash/difference'
import { cardHeight, cardWidth, factionCardDescription } from '../material/FactionCardDescription'

export class BuildingDeckLocator extends FlexLocator {
  getLocations({ rules }: MaterialContext) {
    const xWithCard = rules.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems().map(item => item.location.x)
    return difference(range(0, 23), xWithCard).map(x => ({ type: LocationType.PlayerDeck, x }))
  }

  locationDescription = new BuildingDeckDescription()
  coordinates = { x: 45 }
  gap = { x: cardWidth + 1 }
  lineSize = 6
  lineGap = { y: cardHeight + 1 }
}

class BuildingDeckDescription extends DropAreaDescription {
  constructor() {
    super(factionCardDescription)
  }

  extraCss = css`
    border: 1px solid white;
  `
}
