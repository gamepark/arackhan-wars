import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'


export class OmnistrikeAttribute extends AttackAttributeRule {
}

export const omnistrike = new class extends Attribute<OmnistrikeAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Omnistrike

  cardAttribute: CardAttribute = { type: CardAttributeType.Omnistrike }

  getAttributeRule(game: MaterialGame) {
    return new OmnistrikeAttribute(game)
  }

}
