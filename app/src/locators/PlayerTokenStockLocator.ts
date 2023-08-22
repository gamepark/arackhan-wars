/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerTokenStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  rotate = true
  radius = 3

  getCoordinates({ location }: MaterialItem, { player, rules }: ItemContext): Coordinates {
    if (location.player === (player ?? rules.players[0])) {
      return { x: 35, y: 23, z: 0 }
    }

    return { x: 35, y: -23, z: 0 }
  }


}
