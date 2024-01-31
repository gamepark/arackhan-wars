/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isMimic } from '@gamepark/arackhan-wars/material/cards/Effect'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { LocationContext } from '@gamepark/react-game/dist/locators'
import { Location } from '../../../../workshop/packages/rules-api'
import { FactionCardDescription, factionCardDescription } from '../material/FactionCardDescription'

export class CardTurnEffectLocator extends ItemLocator {
  locationDescription = new CardTurnEffectLocationDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 50, y: 50 }
}

class CardTurnEffectLocationDescription extends LocationDescription {
  width = factionCardDescription.width
  ratio = factionCardDescription.ratio

  getExtraCss = (location: Location, { material }: LocationContext) => {
    if (location.id && isMimic(location.id)) {
      const description = material[MaterialType.FactionCard] as FactionCardDescription
      return css`
        border-radius: inherit;
        background-image: url(${description.images[location.id.target]});
        background-size: cover;
        pointer-events: none;
      `
    }
    return
  }
}
