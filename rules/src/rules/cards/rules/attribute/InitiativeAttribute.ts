import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeRule } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'


export class InitiativeAttributeRule extends AttributeRule {
  constructor(game: MaterialGame) {
    super(game)
  }
}

export const initiative = new class extends Attribute<InitiativeAttributeRule> {
  type = CardAttributeType.Initiative

  getAttributeRule(game: MaterialGame) {
    return new InitiativeAttributeRule(game)
  }

}

export const isInitiative = (attribute: Attribute): attribute is Attribute<InitiativeAttributeRule> => attribute.type === CardAttributeType.Initiative
