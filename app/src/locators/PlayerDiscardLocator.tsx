/** @jsxImportSource @emotion/react */
import { BaseContext, DeckLocator, LocationRulesProps, PlaceItemContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerDiscardRules } from './PlayerDiscardRules'
import { ReactNode } from 'react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { css, Interpolation, Theme } from '@emotion/react'

export class PlayerDiscardLocator extends DeckLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.Battlefield

  getParentItemLocations(_parent: any, context: BaseContext<Faction, MaterialType, LocationType>): Location<Faction, LocationType>[] {
    return context.game.players.map((p) => ({
      type: LocationType.PlayerDiscard,
      id: p,
      player: p
    }))
  }

  getDisplayIndex(player: Faction, context: BaseContext<Faction, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates(item: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>) {
    const coordinates = this.getPositionOnParent(item.location, context)
    return { ...coordinates, z: 0 }
  }

  getPositionOnParent(location: Location<Faction, LocationType>, context: BaseContext<Faction, MaterialType, LocationType>): XYCoordinates {
    const index = this.getDisplayIndex(location.player!, context)
    if (index === 0) {
      return { x: 92.2, y: 90 }
    }

    return { x: 7.7, y: 9.9 }
  }

  getLocationCss(_location: Location<Faction, LocationType>): Interpolation<Theme> {
    const height = factionCardDescription.height
    const width = height * factionCardDescription.ratio
    const radius = height / 15
    return css`
      width: ${width}em;
      height: ${height}em;
      border-radius: ${radius}em;
    `
  }

  getLocationRules(_props: LocationRulesProps<Faction, MaterialType, LocationType>): ReactNode {
    return <PlayerDiscardRules {..._props} />
  }


}
