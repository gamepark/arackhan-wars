/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'

export class BattlefieldDescription extends LocationDescription {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  borderRadius = 0.2
  alwaysVisible = false

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    // When 2 cards are swapped, we have to disable the battlefield drop area beneath the card to prevent glitches with dnd-kit
    return !this.isSwapCards(move, context) && super.isMoveToLocation(move, location, context)
  }

  private isSwapCards = (move: MaterialMove, { rules }: MaterialContext) =>
    isMoveItem(move) && move.itemType === MaterialType.FactionCard
    && move.location.type === LocationType.Battlefield
    && rules.material(MaterialType.FactionCard).location(location =>
      location.type === LocationType.Battlefield && location.x === move.location.x && location.y === move.location.y
    ).length > 0
}
