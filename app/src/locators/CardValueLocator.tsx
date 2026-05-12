import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

export class CardValueLocator extends Locator {
  locationDescription = new CardValueDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 89.5, y: 7.5 }
}

class CardValueDescription extends LocationDescription {
  width = 1
  height = 1
  borderRadius = 0.5

  extraCss = css`
    border: 0.1em solid green;
  `
}
