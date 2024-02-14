/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { GridLocator, LocationDescription } from '@gamepark/react-game'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'

export class DeckbuildingBookLocator extends GridLocator {
  coordinates = { x: 0, y: 7, z: 0 }
  itemsGap = { x: cardWidth + 1 }
  itemsPerLine = 6
  linesGap = { y: cardHeight + 1 }

  locationDescription = new DeckbuildingBookDescription()
}

class DeckbuildingBookDescription extends LocationDescription {
  location = { type: LocationType.DeckbuildingBook }
  width = cardWidth * 6 + 6
  height = cardHeight * 3 + 3
  borderRadius = 0.5
  coordinates = { x: (this.width - cardWidth - 1) / 2, y: (this.height - cardHeight - 1) / 2 + 7, z: 0 }
}
