import { DropAreaDescription, FlexLocator } from '@gamepark/react-game'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'

export class DeckbuildingBookLocator extends FlexLocator {
  coordinates = { y: 7 }
  gap = { x: cardWidth + 1 }
  lineSize = 6
  lineGap = { y: cardHeight + 1 }
  maxLines = 3
  locationDescription = new DeckbuildingBookDescription()
}

class DeckbuildingBookDescription extends DropAreaDescription {
  width = cardWidth * 6 + 6
  height = cardHeight * 3 + 3
  borderRadius = 0.5
}
