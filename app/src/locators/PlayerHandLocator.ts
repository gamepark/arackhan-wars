import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  isHidden(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>) {
    if (location.player === context.player) {
      return { x: 50, y: 12, z: 10 }
    } else {
      return { x: 50, y: -12, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem, { player }: ItemContext): number {
    return item.location.player === player ? 0 : -180
  }

  getGapMaxAngle(): number {
    return 1.2
  }

  getMaxAngle(): number {
    return 9
  }

  getRadius(): number {
    return 300
  }
}
