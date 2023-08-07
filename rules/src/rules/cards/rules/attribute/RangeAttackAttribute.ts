import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'

export class RangeAttackAttributeRule extends AttackAttributeRule {

  constructor(game: MaterialGame, readonly strength: number) {
    super(game)
  }
}

export const rangedAttack = (distance: number) => new class extends Attribute<RangeAttackAttributeRule> {
  kind = AttributeKind.Attack
  type = CardAttributeType.RangedAttack

  cardAttribute: CardAttribute = { type: CardAttributeType.RangedAttack, strength: distance }

  getAttributeRule(game: MaterialGame) {
    return new RangeAttackAttributeRule(game, distance)
  }

}
