/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'

export class CardValueLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new CardValueDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 89.5, y: 7.5 }
}

class CardValueDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = 1
  ratio = 1
  borderRadius = this.width / 2

  getExtraCss = () => css`
    border: 0.1em solid green;
  `
}
