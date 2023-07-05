import { Faction } from '../../Faction'
import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../ArackhanWarsOptions'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { FactionCardType } from '../../material/FactionCardType'

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
  canAttackOpponent = (_attacker: MaterialItem<PlayerId, MaterialType, LocationType>, _opponent: MaterialItem<PlayerId, MaterialType, LocationType>) => {
    const distance = Math.abs((_opponent.location.x! - _attacker.location.x!)) + Math.abs(_opponent.location.y! - _attacker.location.y!)
    return distance === 1
  }

  canAttack = () => {
    return this.attack !== undefined
  }

  canMove = () => {
    return this.hasAttribute(CardAttributeType.Movement) || this.hasAttribute(CardAttributeType.Flight)
  }

  onRoundEnd = (_rules: MaterialRulesPart): MaterialMove[] => []

  afterActivation = (_rules: MaterialRulesPart): MaterialMove[] => []

  discardCard = (_rules: MaterialRulesPart): MaterialMove[] => {
    const thisCard = _rules
      .material(MaterialType.FactionCard)
      .id((id: any) => {
        // FIXME: Don't know why, but number is converted to string there
        return +id!.front === this.type
      })

    const moves: MaterialMove[] = []

    const factionToken = _rules.material(MaterialType.FactionToken).parent(thisCard.index)
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

  private hasAttribute = (attribute: CardAttributeType) => !!this.attributes?.some((a) => a.type === attribute)
}

export {
  FactionCardRule
}
