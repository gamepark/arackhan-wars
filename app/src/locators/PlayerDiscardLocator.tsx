/** @jsxImportSource @emotion/react */
import { BaseContext, DeckLocator, LocationRulesProps, PlaceLocationContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerDiscardRules } from './PlayerDiscardRules'
import { ReactNode } from 'react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { css, Interpolation, Theme } from '@emotion/react'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerDiscardLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getLocations(context: PlaceLocationContext<PlayerId, MaterialType, LocationType>): Location<PlayerId, LocationType>[] {
    return context.game.players.map((player: PlayerId) => ({
      type: LocationType.PlayerDiscard,
      id: player,
      player
    }))
  }

  getPositionOnParent(location: Location<PlayerId, LocationType>, context: BaseContext<PlayerId, MaterialType, LocationType>): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)

    if (index === 0) {
      return { x: 8.4, y: 90 }
    }

    return { x: 91.4, y: 9.85 }
  }

  getLocationCss(): Interpolation<Theme> {
    const height = factionCardDescription.height
    const width = height * factionCardDescription.ratio
    return css`
      width: ${width + 0.2}em;
      height: ${height + 0.2}em;
      border-radius: 0.2em;
    `
  }

  getLocationRules(props: LocationRulesProps<PlayerId, MaterialType, LocationType>): ReactNode {
    return <PlayerDiscardRules {...props} />
  }


}
