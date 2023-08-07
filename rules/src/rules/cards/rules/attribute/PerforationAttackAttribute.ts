import { Material, MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'

export class PerforationAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  getAttackValue(attack: number, attacker: Material, opponent: Material): number {
    const attackerCard = attacker.getItem()!
    const opponentCard = opponent.getItem()!
    const axis = attackerCard.location.x === opponentCard.location.x ? 'y' : 'x'
    return attack - (Math.abs(attackerCard.location[axis]! - opponentCard.location[axis]!) - 1)
  }
}

export const perforation = new class extends Attribute<PerforationAttackAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Perforation

  cardAttribute: CardAttribute = { type: CardAttributeType.Perforation }

  getAttributeRule(game: MaterialGame) {
    return new PerforationAttackAttribute(game)
  }

}
