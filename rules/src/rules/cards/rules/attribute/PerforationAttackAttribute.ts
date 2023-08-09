import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'

export class PerforationAttackAttribute extends AttackAttributeRule {
}

export const perforation = new class extends Attribute<PerforationAttackAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Perforation

  cardAttribute: CardAttribute = { type: CardAttributeType.Perforation }

  getAttributeRule(game: MaterialGame) {
    return new PerforationAttackAttribute(game)
  }

}
