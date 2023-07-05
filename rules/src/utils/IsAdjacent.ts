import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { XYCoordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'


export const isAdjacentToFactionCard = (battlefield: MaterialItem<PlayerId, LocationType, MaterialType>[], position: XYCoordinates) => {
  const north: XYCoordinates = { x: position.x, y: position.y - 1 }
  const east: XYCoordinates = { x: position.x + 1, y: position.y }
  const south: XYCoordinates = { x: position.x, y: position.y + 1 }
  const west: XYCoordinates = { x: position.x - 1, y: position.y }
  return battlefield
    .some((card) => (
      [north, east, south, west]
        .filter((position) => position.x >= 0 && position.y >= 0 && position.x <= 7 && position.y <= 5)
        .some((position) => position.x === card.location.x && position.y === card.location.y)
    ))
}
