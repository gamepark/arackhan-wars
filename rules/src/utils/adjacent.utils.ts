import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Material, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

export const isAdjacentToFactionCard = (battlefield: MaterialItem<PlayerId, LocationType, MaterialType>[], position: XYCoordinates) => {
  return battlefield.some(card => areAdjacent(card.location as XYCoordinates, position))
}

export const areAdjacentCards = (card1: Material, card2: Material) => {
  const item1 = card1.getItem()
  const item2 = card2.getItem()
  if (!item1 || !item2) return false
  return areAdjacent(item1.location as XYCoordinates, item2.location as XYCoordinates)
}

export const areAdjacent = (space1: XYCoordinates, space2: XYCoordinates) => getDistance(space1, space2) === 1

export const getDistance = (space1: XYCoordinates, space2: XYCoordinates) => Math.abs(space1.x - space2.x) + Math.abs(space1.y - space2.y)
