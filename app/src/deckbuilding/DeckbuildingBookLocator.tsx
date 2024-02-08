/** @jsxImportSource @emotion/react */
import { GridLocator } from '@gamepark/react-game'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'

export class DeckbuildingBookLocator extends GridLocator {
  coordinates = { x: 0, y: 7, z: 0 }
  itemsGap = { x: cardWidth + 1 }
  itemsPerLine = 6
  linesGap = { y: cardHeight + 1 }
}
