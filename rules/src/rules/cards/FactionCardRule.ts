import { Faction } from '../../Faction'
import { Material, MaterialItem, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '../../ArackhanWarsOptions'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { FactionCardType, getFactionCard } from '../../material/FactionCardType'
import { isAdjacentToFactionCard } from '../../utils/IsAdjacent'

export enum CardAttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangeAttack,
  Omnistrike
}

export type CardAttribute = {
  type: CardAttributeType,
  strength?: number
}

export enum FactionCardKind {
  Creature = 1,
  Spell,
  Land,
}

abstract class FactionCardRule {
  abstract faction: Faction
  abstract kind: FactionCardKind
  abstract type: FactionCardType
  attack?: number
  defense?: number
  astral?: boolean = false
  quantity?: number = 1
  attributes?: CardAttribute[] = []

  // TODO: Add other card on battlefield (in case of effect that block the attack, or if they ad bonuses to this card)
  canAttackThisOpponent = (_attacker: MaterialItem<PlayerId, MaterialType, LocationType>, _opponent: MaterialItem<PlayerId, MaterialType, LocationType>) => {
    if (!this.canAttack()) return false
    return getDistance(
      { x: _attacker.location.x!, y: _attacker.location.y! },
      { x: _opponent.location.x!, y: _opponent.location.y! }
    ) === 1
  }

  canAttack = () => {
    return this.attack !== undefined
  }

  canMoveTo = (card: MaterialItem, space: XYCoordinates, cardsInBattlefield: Material<PlayerId, MaterialType, LocationType>) => {
    // Check that car has required traits
    if (!this.hasMovement() && !this.canFly()) return false

    // Check the adjacency rule
    if (!isAdjacentToFactionCard(cardsInBattlefield.getItems(), space)) return false

    // The space must be empty
    const itemOnSpace = cardsInBattlefield.location((location) => location.x === space.x && location.y === space.y).getItem()
    if (!itemOnSpace) return true

    // It must not be the card itself
    if (itemOnSpace.id.front === card.id.front) return false

    const cardOnSpace = getFactionCard(itemOnSpace.id.front)

    // It can be swapped if both card has movement or flight
    return itemOnSpace.location.player === card.location.player && (cardOnSpace.hasMovement() || cardOnSpace.canFly())
  }

  onRoundEnd = (_rules: MaterialRulesPart): MaterialMove[] => []

  onTurnEnd = (_rules: MaterialRulesPart): MaterialMove[] => []

  afterActivation = (_rules: MaterialRulesPart): MaterialMove[] => []

  discardCard = (_rules: MaterialRulesPart): MaterialMove[] => {
    const thisCard = _rules
      .material(MaterialType.FactionCard)
      .id((id: any) => {
        // FIXME: Don't know why, but number is converted to string there
        return +id!.front === this.type
      })

    const moves: MaterialMove[] = []

    const factionToken = _rules.material(MaterialType.FactionToken).parent(thisCard.getIndex())
    if (factionToken.getItem()) {
      moves.push(factionToken.deleteItem())
    }

    moves.push(
      thisCard
        .moveItem({ location: { type: LocationType.PlayerDiscard, player: thisCard.getItem()?.location.player } })
    )

    return moves
  }

  hasInitiative = () => this.hasAttribute(CardAttributeType.Initiative)
  hasOmnistrike = () => this.hasAttribute(CardAttributeType.Omnistrike)
  hasMovement = () => this.hasAttribute(CardAttributeType.Movement)
  canFly = () => this.hasAttribute(CardAttributeType.Flight)

  private hasAttribute = (attribute: CardAttributeType) => !!this.attributes?.some((a) => a.type === attribute)
}

const getDistance = (position1: XYCoordinates, position2: XYCoordinates) => Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)

export {
  FactionCardRule
}
