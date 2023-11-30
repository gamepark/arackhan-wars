/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import AstralPlaneImage from '../images/locations/astral-plane.png'
import { factionCardDescription } from '../material/FactionCardDescription'
import { AstralPlaneHelp } from './AstralPlaneHelp'

export class AstralPlaneDescription extends LocationDescription {
  width = factionCardDescription.width
  ratio = 785 / 1095
  borderRadius = 0.4

  help = AstralPlaneHelp
  helpImage = AstralPlaneImage
}
