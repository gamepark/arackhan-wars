import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  getDisplayIndex(player: PlayerId, context: ItemContext) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>) {
    if (location.player === context.player) {
      return { x: -10, y: 28, z: 10 }
    } else {
      return { x: 28, y: -23, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 0 : -90
  }

  getGapMaxAngle(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 1.1 : 1
  }

  getMaxAngle(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 15 : 5
  }

  getRadius(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 300 : 200
  }
}
