/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { AstralPlaneRules } from './AstralPlaneRules'
import AstralPlaneImage from '../images/locations/astral-plane.png'

export class AstralPlaneDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = factionCardDescription.width
  ratio = 785 / 1095
  borderRadius = 0.4

  rules = AstralPlaneRules
  rulesImage = AstralPlaneImage
}
