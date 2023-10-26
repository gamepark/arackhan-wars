/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { factionCardDescription } from '../material/FactionCardDescription'

export class PlayerDeckDescription extends LocationDescription {
  width = factionCardDescription.width + 1
  ratio = factionCardDescription.ratio
  borderRadius = 0.4
  alwaysVisible = false
  coordinates = { x: 0, y: 0, z: 10 }
}
