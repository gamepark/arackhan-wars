/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'

export class CardValueLocator extends ItemLocator {
  locationDescription = new CardValueDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 89.5, y: 7.5 }
}

class CardValueDescription extends LocationDescription {
  width = 1
  ratio = 1
  borderRadius = this.width / 2

  getExtraCss = () => css`
    border: 0.1em solid green;
  `
}
