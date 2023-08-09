import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'

class SwarmAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }
}

export const swarm = new class extends Attribute<SwarmAttackAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Swarm

  cardAttribute: CardAttribute = { type: CardAttributeType.Swarm }

  getAttributeRule(game: MaterialGame) {
    return new SwarmAttackAttribute(game)
  }

}
