import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { XYCoordinates, MaterialItem, Material } from '@gamepark/rules-api'

export const isAdjacentToFactionCard = (battlefield: MaterialItem<PlayerId, LocationType, MaterialType>[], position: XYCoordinates) => {
  return battlefield
    .some((card) => getDistance({ x: card.location.x!, y: card.location.y! }, position) === 1)
}

export const areAdjacent = (card1: Material, card2: Material) => {
  const item1 = card1.getItem()
  const item2 = card2.getItem()
  if (!item1 || !item2) return false

  return getDistance(
    { x: item1.location.x!, y: item1.location.y! },
    { x: item2.location.x!, y: item2.location.y! }
  ) === 1
}


export const getDistance = (position1: XYCoordinates, position2: XYCoordinates) => Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)

