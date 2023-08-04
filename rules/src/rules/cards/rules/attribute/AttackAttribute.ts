import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { FactionCardInspector } from '../helper/FactionCardInspector'


export abstract class AttackAttributeRule extends AttributeRule {
  abstract getLegalAttacks(attacker: Material, opponentsCards: Material, cardInspector: FactionCardInspector): MaterialMove[]

  getAttackValue(attack: number, _attacker: Material, _opponent: Material): number {
    return attack
  }

  getTargets(_source: Material, target: Material, _opponentsCards: Material): number[] {
    if (!target.length) return []
    return [
      target.getIndex()
    ]
  }

  isValidTarget(source: Material, target: Material, opponentsCards: Material): boolean {
    return !!this.getTargets(source, target, opponentsCards).length
  }

  getConsecutiveTargets(attacker: Material, opponent: Material, opponentsCards: Material): number[] {
    return this.getTargets(attacker, opponent, opponentsCards)
  }
}

export const isAttackAttribute = (attribute: Attribute): attribute is Attribute<AttackAttributeRule> => attribute.kind === AttributeKind.Attack
