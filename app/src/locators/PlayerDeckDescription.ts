/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerDeckHelp } from './PlayerDeckHelp'

export class PlayerDeckDescription extends LocationDescription {
  width = factionCardDescription.width
  ratio = factionCardDescription.ratio
  borderRadius = 0.4
  alwaysVisible = true
  coordinates = { x: 0, y: 0, z: 0 }
  help = PlayerDeckHelp
}
