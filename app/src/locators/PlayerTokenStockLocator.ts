/** @jsxImportSource @emotion/react */
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerTokenStockLocator extends PileLocator {
  radius = 3
  getCoordinates = (location: Location, { player = 1 }: MaterialContext) => ({ x: 35, y: location.player === player ? 23 : -23 })
}
