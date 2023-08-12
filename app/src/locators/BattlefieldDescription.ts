/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'

export class BattlefieldDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  borderRadius = 0.2
  alwaysVisible = false

  canDrop(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    // When 2 cards are swapped, we have to disable the battlefield drop area beneath the card to prevent glitches with dnd-kit
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard
      && move.position.location?.type === LocationType.Battlefield
      && context.game.items[MaterialType.FactionCard]?.find(item =>
        item.location.type === LocationType.Battlefield && item.location.x === move.position.location?.x && item.location.y === move.position.location?.y
      )
    ) {
      return false
    }

    return super.canDrop(move, location, context)
  }
}
