/** @jsxImportSource @emotion/react */
import { BaseContext, DeckLocator, PlaceLocationContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerDeckLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getPositionOnParent(location: Location<PlayerId, LocationType>, context: BaseContext<PlayerId, MaterialType, LocationType>): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)
    if (index === 0) {
      return { x: 92.2, y: 90 }
    }

    return { x: 7.7, y: 9.9 }
  }


  getDelta() {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  isHidden(): boolean {
    return true
  }

  getLocations(context: PlaceLocationContext<PlayerId, MaterialType, LocationType>): Location<PlayerId, LocationType>[] {
    return [{
      type: LocationType.PlayerDeck,
      player: context.player
    }]
  }

  isDragOnlyLocation(): boolean {
    return true
  }

  getLocationCss() {
    return css`
      width: ${factionCardDescription.width + 1}em;
      height: ${factionCardDescription.width / factionCardDescription.ratio + 1}em;
      border-radius: ${(factionCardDescription.borderRadius)}em;
      // TODO: maybe provide a way to put drop area at the top of position
      transform: translate3d(-50%, -50%, 30em);
    `
  }
}
