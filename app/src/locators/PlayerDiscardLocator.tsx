/** @jsxImportSource @emotion/react */
import { BaseContext, DeckLocator, LocationRulesProps, PlaceLocationContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerDiscardRules } from './PlayerDiscardRules'
import { ReactNode } from 'react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { css, Interpolation, Theme } from '@emotion/react'

export class PlayerDiscardLocator extends DeckLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayMat

  getLocations(context: PlaceLocationContext<Faction, MaterialType, LocationType>): Location<Faction, LocationType>[] {
    return context.game.players.map((player: Faction) => ({
      type: LocationType.PlayerDiscard,
      id: player,
      player
    }))
  }

  getPositionOnParent(location: Location<Faction, LocationType>, context: BaseContext<Faction, MaterialType, LocationType>): XYCoordinates {
    const index = this.getRelativePlayerIndex(context, location.player!)

    if (index === 0) {
      return { x: 8.4, y: 90 }
    }

    return { x: 91.4, y: 9.85 }
  }

  getLocationCss(_location: Location<Faction, LocationType>): Interpolation<Theme> {
    const height = factionCardDescription.height
    const width = height * factionCardDescription.ratio
    return css`
      width: ${width + 0.2}em;
      height: ${height + 0.2}em;
      border-radius: 0.2em;
    `
  }

  getLocationRules(_props: LocationRulesProps<Faction, MaterialType, LocationType>): ReactNode {
    return <PlayerDiscardRules {..._props} />
  }


}
