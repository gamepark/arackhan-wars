import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  radius = 300
  maxAngle = 9
  gapMaxAngle = 1.2
  getCoordinates = (location: Location, { player = 1 }: MaterialContext) => ({ x: 50, y: location.player === player ? 12 : -12, z: 5 })
  getBaseAngle = (location: Location, { player = 1 }: MaterialContext) => location.player === player ? 0 : -180
}
