/** @jsxImportSource @emotion/react */
import { DeckLocator, PlaceItemContext } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerDeckLocator extends DeckLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.Battlefield

  getDisplayIndex(player: Faction, context: PlaceItemContext<Faction, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates(item: MaterialItem<Faction, LocationType>, context: PlaceItemContext<Faction, MaterialType, LocationType>) {

    const index = this.getDisplayIndex(item.location.player!, context)
    if (index === 0) {
      return { x: 24, y: -23, z: 0 }
    }

    return { x: -24, y: 23, z: 0 }
  }


  getDelta() {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  isHidden(): boolean {
    return true
  }
}
