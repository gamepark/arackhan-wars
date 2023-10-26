/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerTokenStockLocator extends PileLocator {
  rotate = true
  radius = 3

  getCoordinates({ location }: MaterialItem, { player, rules }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: 35, y: 23, z: 0 }
    }

    return { x: 35, y: -23, z: 0 }
  }


}
