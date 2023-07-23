/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { Location } from '@gamepark/rules-api/dist/material/location/Location'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils/IsLocationSubset'

export class BattlefieldDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  borderRadius = 0.2
  alwaysVisible = false

  canDrop(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (isMoveItemType(MaterialType.FactionCard)(move)
      && move.position.location
      && move.position.location.type === LocationType.Battlefield) {
      const rules = new ArackhanWarsRules(context.game)
      const cardOnSpace = rules.material(MaterialType.FactionCard).location((location) => isLocationSubset(move.position.location!, location))
      if (cardOnSpace.length) return false
    }

    return super.canDrop(move, location, context)
  }
}
