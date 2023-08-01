import { Material, MaterialGame, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { battlefieldSpaceCoordinates } from '../../../../material/spaces'
import { LocationType } from '../../../../material/LocationType'
import { getDistance, isAdjacentToFactionCard } from '../../../../utils/adjacent.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { getCharacteristics } from '../../../../material/FactionCard'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import equal from 'fast-deep-equal'


export class MovementAttributeRule extends AttributeRule {
  constructor(game: MaterialGame, readonly movement?: number) {
    super(game)
  }

  getLegalMovements(source: Material, cardInspector: FactionCardInspector): MaterialMove[] {
    return battlefieldSpaceCoordinates
      .filter((space) => this.canMoveTo(source, space, cardInspector))
      .map((space) => (
        source
          .moveItem({ location: { type: LocationType.Battlefield, x: space.x, y: space.y, player: source.getItem()?.location.player } }))
      )
  }

  hasEnoughMovement(source: Material, space: XYCoordinates) {
    if (!this.movement) return true
    const card = source.getItem()!
    const sourceCoordinates = { x: card.location.x!, y: card.location.y! }
    return getDistance(sourceCoordinates, space) <= this.movement
  }

  canMoveTo(source: Material, space: XYCoordinates, cardInspector: FactionCardInspector) {
    if (!this.hasEnoughMovement(source, space)) return false

    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const card = source.getItem()!
    const characteristics = getCharacteristics(source.getIndex(), this.game)

    if (!characteristics.canMove() && !characteristics.canFly()) return false
    if (characteristics.canFly() && cardInspector.hasLostAttributes(source.getIndex(), CardAttributeType.Flight)) return false
    if (characteristics.hasMovement() && cardInspector.hasLostAttributes(source.getIndex(), CardAttributeType.Movement)) return false

    // Check the adjacency rule
    const otherCardOnBattlefield = battlefield.filter((otherCard) => !equal(otherCard.location, card.location)).getItems()
    if (!isAdjacentToFactionCard(otherCardOnBattlefield, space)) return false

    // The space must be empty
    const itemOnSpace = battlefield.location((location) => location.x === space.x && location.y === space.y)
    if (!itemOnSpace.length) return true

    // It must not be the card itself
    if (itemOnSpace.getIndex() === source.getIndex()) return false

    const cardOnSpace = getCharacteristics(itemOnSpace.getIndex(), this.game)

    // It can be swapped if both card has movement or flight
    return itemOnSpace.getItems()[0].location.player === card.location.player && (cardOnSpace.hasMovement() || cardOnSpace.canFly())
  }
}

export const movement = (distance: number) => new class extends Attribute<MovementAttributeRule> {
  kind = AttributeKind.Move
  type = CardAttributeType.Movement

  getAttributeRule(game: MaterialGame) {
    return new MovementAttributeRule(game, distance)
  }

}

export const flight = new class extends Attribute<MovementAttributeRule> {
  kind = AttributeKind.Move
  type = CardAttributeType.Flight

  getAttributeRule(game: MaterialGame) {
    return new MovementAttributeRule(game)
  }
}

export const isMovementAttribute = (attribute: Attribute): attribute is Attribute<MovementAttributeRule> => attribute.kind === AttributeKind.Move
