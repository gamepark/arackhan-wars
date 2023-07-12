import { Material, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { battlefieldSpaceCoordinates } from '../../../../material/spaces'
import { isAdjacentToFactionCard } from '../../../../utils/IsAdjacent'
import { FactionCardDetail } from '../../descriptions/FactionCardDetail'

export class MoveRules extends MaterialRulesPart {
  readonly card: FactionCardDetail
  readonly item: Material
  readonly index: number

  constructor(game: MaterialGame, item: Material, card: FactionCardDetail, index: number) {
    super(game)
    this.item = item
    this.card = card
    this.index = index
  }

  getPossibleMoves(cardsInBattlefield: Material): MaterialMove[] {
    return battlefieldSpaceCoordinates
      .filter((space) => this.canMoveTo(space, cardsInBattlefield))
      .map((space) => (
        this.item
          .moveItem({ location: { type: LocationType.Battlefield, x: space.x, y: space.y, player: this.item.getItem()?.location.player } }))
      )
  }

  canMoveTo(space: XYCoordinates, cardsInBattlefield: Material<PlayerId, MaterialType, LocationType>) {
    // Check that car has required traits
    if (!this.card.hasMovement() && !this.card.canFly()) return false

    // Check the adjacency rule
    if (!isAdjacentToFactionCard(cardsInBattlefield.getItems(), space)) return false

    // The space must be empty
    const itemOnSpace = cardsInBattlefield.location((location) => location.x === space.x && location.y === space.y).getItem()
    if (!itemOnSpace) return true

    // It must not be the card itself
    if (itemOnSpace.id.front === this.card.id) return false

    const cardOnSpace = getFactionCardDescription(itemOnSpace.id.front)

    // It can be swapped if both card has movement or flight
    return itemOnSpace.location.player === this.item.getItem()!.location.player && (cardOnSpace.hasMovement() || cardOnSpace.canFly())
  }
}
