import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { XYCoordinates, MaterialItem } from '@gamepark/rules-api'

export const isAdjacentToFactionCard = (battlefield: MaterialItem<PlayerId, LocationType, MaterialType>[], position: XYCoordinates) => {
  return battlefield
    .some((card) => getDistance({ x: card.location.x!, y: card.location.y! }, position) === 1)
}

export const areAdjacent = (card1: MaterialItem, card2: MaterialItem) => getDistance(
  { x: card1.location.x!, y: card1.location.y! },
  { x: card2.location.x!, y: card2.location.y! }
) === 1


export const getDistance = (position1: XYCoordinates, position2: XYCoordinates) => Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)

