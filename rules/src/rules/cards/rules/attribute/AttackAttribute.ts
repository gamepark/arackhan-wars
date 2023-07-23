import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'


export abstract class AttackAttributeRule extends AttributeRule {
  abstract getLegalAttacks(attacker: Material, opponentsCards: Material, effectHelper: FactionCardEffectHelper): MaterialMove[]

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
