import { Material, MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { getAdjacentCards } from '../../../../utils/move.utils'
import { getCardRule } from '../base/CardRule'


export class OmnistrikeAttribute extends AttackAttributeRule {
  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material) {
    const opponents = getAdjacentCards(attacker, opponentsCards)

    if (!opponents.length || this.isBlocked(attacker)) return []
    return [
      this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex()
      })
    ]
  }

  getTargets(attacker: Material, opponent: Material, opponentsCards: Material): number[] {
    if (!opponent.length || this.isBlocked(attacker)) return []

    console.log('Omnistrike', getAdjacentCards(attacker, opponentsCards))
    return getAdjacentCards(attacker, opponentsCards)
  }

  isBlocked(attacker: Material): boolean {
    const attackerCardDescription = getCardRule(this.game, attacker.getIndex()).characteristics
    return attackerCardDescription.hasPerforation()
  }
}

export const omnistrike = new class extends Attribute<OmnistrikeAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Omnistrike

  cardAttribute: CardAttribute = { type: CardAttributeType.Omnistrike }

  getAttributeRule(game: MaterialGame) {
    return new OmnistrikeAttribute(game)
  }

}
