import { PlayerId } from '../ArackhanWarsOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Material, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { battlefieldSpaceCoordinates } from '../material/spaces'
import { areAdjacentCards, isAdjacentToFactionCard } from './adjacent.utils'

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

export const getAdjacentCards = (card: Material, otherCards: Material) => {
  return otherCards
    .getIndexes()
    .filter((otherCardIndex) => areAdjacentCards(otherCards.index(otherCardIndex), card))
}
