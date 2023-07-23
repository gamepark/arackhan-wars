import { Material, MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { isSpell } from '../../descriptions/base/Spell'
import { getAdjacentCards } from '../../../../utils/move.utils'


export class OmnistrikeAttribute extends AttackAttributeRule {
  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material) {
    const opponents = getAdjacentCards(attacker, opponentsCards)
      .filter((index: number) => !isSpell(getFactionCardDescription(opponentsCards.getItem(index)!.id.front)))

    if (!opponents.length || this.isBlocked(attacker)) return []
    return [
      this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex()
      })
    ]
  }

  getTargets(attacker: Material, opponent: Material, opponentsCards: Material): number[] {
    if (!opponent.length || this.isBlocked(attacker)) return []
    
    return getAdjacentCards(attacker, opponentsCards)
      .filter((index: number) => !isSpell(getFactionCardDescription(opponentsCards.getItem(index)!.id.front)))
  }

  isBlocked(attacker: Material): boolean {
    const attackerCard = attacker.getItem()!
    const attackerCardDescription = getFactionCardDescription(attackerCard.id.front)
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
