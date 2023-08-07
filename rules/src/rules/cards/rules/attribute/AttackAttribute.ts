import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { Material } from '@gamepark/rules-api'


export abstract class AttackAttributeRule extends AttributeRule {
  getAttackValue(attack: number, _attacker: Material, _opponent: Material): number {
    return attack
  }

  getTargets(_source: Material, target: Material, _opponentsCards: Material): number[] {
    if (!target.length) return []
    return [
      target.getIndex()
    ]
  }
}

export const isAttackAttribute = (attribute: Attribute): attribute is Attribute<AttackAttributeRule> => attribute.kind === AttributeKind.Attack
