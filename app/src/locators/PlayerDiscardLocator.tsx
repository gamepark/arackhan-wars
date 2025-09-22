import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckLocator, DropAreaDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import discard from '../images/locations/discard.png'
import { PlayerDiscardHelp } from './PlayerDiscardHelp'

export class PlayerDiscardLocator extends DeckLocator {
  locationDescription = new PlayerDiscardDescription()
  parentItemType = MaterialType.BattleMat
  getPositionOnParent = (location: Location, { player = 1 }: MaterialContext) => location.player === player ? { x: 8.4, y: 90 } : { x: 91.4, y: 9.85 }
  getRotateZ = (location: Location, { player = 1 }: ItemContext) => location.player === player ? 0 : 180
}

class PlayerDiscardDescription extends DropAreaDescription {
  width = 6.55
  height = 9.14
  borderRadius = 0.4
  help = PlayerDiscardHelp
  helpImage = discard
}
