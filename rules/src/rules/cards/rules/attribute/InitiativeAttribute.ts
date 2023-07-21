import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeRule } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'


export class InitiativeAttributeRule extends AttributeRule {
  constructor(game: MaterialGame) {
    super(game)
  }

  canBeActivated(initiative: boolean) {
    return initiative
  }


}

export const initiative = new class extends Attribute<InitiativeAttributeRule> {
  type = CardAttributeType.Initiative

  getAttributeRule(game: MaterialGame) {
    return new InitiativeAttributeRule(game)
  }

}

export const isInitiative = (attribute: Attribute<any>): attribute is Attribute<InitiativeAttributeRule> => attribute.type === CardAttributeType.Initiative
