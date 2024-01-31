/** @jsxImportSource @emotion/react */
import { GridLocator } from '@gamepark/react-game'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'

export class DeckbuildingBookLocator extends GridLocator {
  itemsGap = { x: cardWidth + 1 }
  itemsPerLine = 6
  linesGap = { y: cardHeight + 1 }
}
