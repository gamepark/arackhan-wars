/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { factionTokenDescription } from '../material/FactionTokenDescription'

export class FactionTokenSpaceDescription extends LocationDescription {
  width = factionTokenDescription.diameter
  ratio = 1
  borderRadius = this.width / 2
}
