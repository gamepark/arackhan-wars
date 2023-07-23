import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'


export abstract class AttackAttributeRule extends AttributeRule {
  abstract getLegalAttacks(attacker: Material, opponentsCards: Material, effectHelper: FactionCardEffectHelper): MaterialMove[]

  getAttackValue(attack: number, _attacker: Material, _opponent: Material): number {
    return attack
  }

  getTargets(_attacker: Material, opponent: Material, _opponentsCards: Material): number[] {
    if (!opponent.length) return []
    return [
      opponent.getIndex()
    ]
  }
}

export const isAttackAttribute = (attribute: Attribute<any>): attribute is Attribute<AttackAttributeRule> => attribute.kind === AttributeKind.Attack
