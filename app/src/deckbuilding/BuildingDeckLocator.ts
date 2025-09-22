import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { DropAreaDescription, FlexLocator } from '@gamepark/react-game'
import { range } from 'es-toolkit'
import { cardHeight, cardWidth, factionCardDescription } from '../material/FactionCardDescription'

export class BuildingDeckLocator extends FlexLocator {
  locations = range(0, 23).map(x => ({ type: LocationType.PlayerDeck, x }))
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
