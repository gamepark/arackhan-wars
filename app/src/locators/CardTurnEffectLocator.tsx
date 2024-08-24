/** @jsxImportSource @emotion/react */
import { isMimic } from '@gamepark/arackhan-wars/material/cards/Effect'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FactionCardDescription, factionCardDescription } from '../material/FactionCardDescription'

export class CardTurnEffectLocator extends Locator {
  locationDescription = new CardTurnEffectLocationDescription()
  parentItemType = MaterialType.FactionCard
}

class CardTurnEffectLocationDescription extends LocationDescription {
  constructor() {
    super(factionCardDescription)
  }

  getImage(location: Location, { material }: MaterialContext) {
    if (location.id && isMimic(location.id)) {
      const description = material[MaterialType.FactionCard] as FactionCardDescription
      return description.images[location.id.target]
    }
    return
  }
}
