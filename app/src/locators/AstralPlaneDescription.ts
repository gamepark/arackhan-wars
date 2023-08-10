/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { AstralPlaneRules } from './AstralPlaneRules';
import AstralPlaneImage from '../images/locations/astral-plane.jpg'

export class AstralPlaneDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  borderRadius = 0.2

  // TODO: ask an image with a better resolution
  image = AstralPlaneImage

  rules = AstralPlaneRules
}
