import { Material, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { battlefieldSpaceCoordinates } from '../../../../material/spaces'
import { isAdjacentToFactionCard } from '../../../../utils/adjacent.utils'
import { CardAttributeType, FactionCardDetail } from '../../descriptions/FactionCardDetail'
import { CardModification } from './EffectRule'
import { hasLostAttribute } from '../../../../utils/attributes.utils'

export class MoveRules extends MaterialRulesPart {
  readonly card: FactionCardDetail
  readonly item: Material
  readonly index: number
  readonly battlefieldCards: Material

  constructor(game: MaterialGame, item: Material, card: FactionCardDetail, index: number, battlefieldCards: Material) {
    super(game)
    this.item = item
    this.card = card
    this.index = index
    this.battlefieldCards = battlefieldCards
  }

  getLegalMovements(modifications: Record<number, CardModification>): MaterialMove[] {
    return battlefieldSpaceCoordinates
      .filter((space) => this.canMoveTo(space, modifications))
      .map((space) => (
        this.item
          .moveItem({ location: { type: LocationType.Battlefield, x: space.x, y: space.y, player: this.item.getItem()?.location.player } }))
      )
  }

  canMoveTo(space: XYCoordinates, modifications: Record<number, CardModification>) {
    // Check that car has required traits
    if (!this.card.canMove() && !this.card.canFly()) return false

    const modification = modifications[this.index]
    if (this.card.canFly() && hasLostAttribute(CardAttributeType.Flight, modification)) return false
    if (this.card.hasMovement() && hasLostAttribute(CardAttributeType.Movement, modification)) return false

    // Check the adjacency rule
    if (!isAdjacentToFactionCard(this.battlefieldCards.getItems(), space)) return false

    // The space must be empty
    const itemOnSpace = this.battlefieldCards.location((location) => location.x === space.x && location.y === space.y).getItem()
    if (!itemOnSpace) return true

    // It must not be the card itself
    if (itemOnSpace.id.front === this.card.id) return false

    const cardOnSpace = getFactionCardDescription(itemOnSpace.id.front)

    // It can be swapped if both card has movement or flight
    return itemOnSpace.location.player === this.item.getItem()!.location.player && (cardOnSpace.hasMovement() || cardOnSpace.canFly())
  }
}
