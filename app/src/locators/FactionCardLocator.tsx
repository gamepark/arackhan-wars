/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, MaterialMove, MoveKind, XYCoordinates } from '@gamepark/rules-api'
import { ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { FactionCardLocationDescription } from './FactionCardLocationDescription'

export class FactionCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new FactionCardLocationDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent = (): XYCoordinates => ({ x: 50, y: 50 })

  isDropLocation = (move: MaterialMove, location: Location): boolean => {
    return move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Attack && (move.data.targets ?? []).includes(location.parent)
  }
}
