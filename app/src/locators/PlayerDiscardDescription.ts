/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import discard from '../images/locations/discard.png'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerDiscardHelp } from './PlayerDiscardHelp'

export class PlayerDiscardDescription extends LocationDescription {
  width = factionCardDescription.width + 0.2
  ratio = 790 / 1102
  borderRadius = 0.4
  alwaysVisible = true
  coordinates = { x: 0, y: 0, z: 10 }

  help = PlayerDiscardHelp
  helpImage = discard
}
