import { PlayerId } from '../ArackhanWarsOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { XYCoordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { battlefieldSpaceCoordinates } from '../material/spaces'
import { isAdjacentToFactionCard } from './adjacent.utils'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'

export const moveToBattlefieldSpace = (cards: Material<PlayerId, MaterialType, LocationType>, space: XYCoordinates, player: PlayerId) => {
  return cards
    .filter((card) => card.location.type !== LocationType.Battlefield || card.location.x !== space.x || card.location.y !== space.y)
    .moveItems({
      location: {
        type: LocationType.Battlefield,
        x: space.x,
        y: space.y,
        player
      },
      rotation: { y: 1 }
    })
}

export const getAvailableCardPlacement = (cardsOnBattlefield: MaterialItem[], playableCards: Material, player: PlayerId) => {
  return battlefieldSpaceCoordinates
    .filter((space) => !cardsOnBattlefield.some((card) => card.location.x === space.x && card.location.y === space.y))
    .filter((space) => isAdjacentToFactionCard(cardsOnBattlefield, space))
    .flatMap((space) => moveToBattlefieldSpace(playableCards, space, player))
}
