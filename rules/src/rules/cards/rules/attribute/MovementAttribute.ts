import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { battlefieldSpaceCoordinates } from '../../../../material/spaces'
import { LocationType } from '../../../../material/LocationType'
import { getDistance, isAdjacentToFactionCard } from '../../../../utils/adjacent.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { XYCoordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'
import equal from 'fast-deep-equal'


export class MovementAttributeRule extends AttributeRule {
  constructor(game: MaterialGame, readonly movement?: number) {
    super(game)
  }

  getLegalMovements(source: Material, effectHelper: FactionCardEffectHelper): MaterialMove[] {
    return battlefieldSpaceCoordinates
      .filter((space) => this.canMoveTo(source, space, effectHelper))
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

  canMoveTo(source: Material, space: XYCoordinates, effectHelper: FactionCardEffectHelper) {
    if (!this.hasEnoughMovement(source, space)) return false

    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const card = source.getItem()!
    const cardDescription = getFactionCardDescription(card.id.front)
    
    if (!cardDescription.canMove() && !cardDescription.canFly()) return false
    if (cardDescription.canFly() && effectHelper.hasLostAttributes(source.getIndex(), CardAttributeType.Flight)) return false
    if (cardDescription.hasMovement() && effectHelper.hasLostAttributes(source.getIndex(), CardAttributeType.Movement)) return false

    // Check the adjacency rule
    const otherCardOnBattlefield = battlefield.filter((otherCard) => !equal(otherCard.location, card.location)).getItems()
    if (!isAdjacentToFactionCard(otherCardOnBattlefield, space)) return false

    // The space must be empty
    const itemOnSpace = battlefield.location((location) => location.x === space.x && location.y === space.y).getItem()
    if (!itemOnSpace) return true

    // It must not be the card itself
    if (itemOnSpace.id.front === card.id.front) return false

    const cardOnSpace = getFactionCardDescription(itemOnSpace.id.front)

    // It can be swapped if both card has movement or flight
    return itemOnSpace.location.player === card.location.player && (cardOnSpace.hasMovement() || cardOnSpace.canFly())
  }
}

export const movement = (strength: number) => new class extends Attribute<MovementAttributeRule> {
  kind = AttributeKind.Move
  type = CardAttributeType.Movement

  getAttributeRule(game: MaterialGame) {
    return new MovementAttributeRule(game, strength)
  }

}

export const flight = new class extends Attribute<MovementAttributeRule> {
  kind = AttributeKind.Move
  type = CardAttributeType.Flight

  getAttributeRule(game: MaterialGame) {
    return new MovementAttributeRule(game)
  }
}

export const isMovementAttribute = (attribute: Attribute<any>): attribute is Attribute<MovementAttributeRule> => attribute.kind === AttributeKind.Move
