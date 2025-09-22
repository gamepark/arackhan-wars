import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import AstralPlaneImage from '../images/locations/astral-plane.png'
import { factionCardDescription } from '../material/FactionCardDescription'
import { AstralPlaneHelp } from './AstralPlaneHelp'

export class AstralPlaneLocator extends Locator {
  locationDescription = new AstralPlaneDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location, { player = 1 }: MaterialContext) {
    const deltaX = location.x! * (factionCardDescription.width + 5.3)
    return location.player === player ? { x: 68.3 + deltaX, y: 90 } : { x: 31.55 - deltaX, y: 9.85 }
  }
}

class AstralPlaneDescription extends DropAreaDescription {
  constructor() {
    super(factionCardDescription)
  }

  help = AstralPlaneHelp
  helpImage = AstralPlaneImage
}
