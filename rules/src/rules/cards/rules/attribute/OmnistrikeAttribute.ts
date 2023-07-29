import { Material, MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { getCharacteristics } from '../../../../material/FactionCard'
import { getAdjacentCards } from '../../../../utils/move.utils'


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
    const attackerCardDescription = getCharacteristics(attacker.getIndex(), this.game)
    return attackerCardDescription.hasPerforation()
  }
}

export const omnistrike = new class extends Attribute<OmnistrikeAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Omnistrike

  getAttributeRule(game: MaterialGame) {
    return new OmnistrikeAttribute(game)
  }

}
