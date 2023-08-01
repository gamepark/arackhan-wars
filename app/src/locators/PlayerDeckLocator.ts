/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { PlayerDeckDescription } from './PlayerDeckDescription'

export class PlayerDeckLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlayerDeckDescription()
  parentItemType = MaterialType.PlayMat

  delta = { x: -0.04, y: -0.04, z: 0.1 }
  hidden = true

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const bottomPlayerId = context.player ?? 1
    return location.player === bottomPlayerId ? { x: 92.2, y: 90 } : { x: 7.7, y: 9.9 }
  }

  getRotation(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): number {
    const bottomPlayerId = context.player ?? 1
    return item.location.player === bottomPlayerId ? 0 : 180
  }
}
