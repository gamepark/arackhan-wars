import { HandLocator, PlaceItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  getDisplayIndex(player: PlayerId, context: PlaceItemContext<PlayerId, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  isHidden(item: MaterialItem<PlayerId, LocationType>, context: PlaceItemContext<PlayerId, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<PlayerId, LocationType>, context: PlaceItemContext<PlayerId, MaterialType, LocationType>) {
    if (location.player === context.player) {
      const count = this.countItems(location, context)
      return { x: -31 + count * 3, y: 28, z: 10 }
    } else {
      const index = this.getDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.game.players.length - 1)
      return { x: 45, y: -28 + baseLocation, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem<PlayerId, LocationType>, { player }: PlaceItemContext<PlayerId, MaterialType, LocationType>): number {
    return item.location.player === player ? 0 : -90
  }

  getGapMaxAngle(item: MaterialItem<PlayerId, LocationType>, { player }: PlaceItemContext<PlayerId, MaterialType, LocationType>): number {
    return item.location.player === player ? 1.1 : 3
  }

  getMaxAngle(item: MaterialItem<PlayerId, LocationType>, { player }: PlaceItemContext<PlayerId, MaterialType, LocationType>): number {
    return item.location.player === player ? 15 : 2.3
  }

  getRadius(item: MaterialItem<PlayerId, LocationType>, { player }: PlaceItemContext<PlayerId, MaterialType, LocationType>): number {
    return item.location.player === player ? 300 : 100
  }
}
