import { Attribute, AttributeKind, AttributeRule } from './Attribute'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'


export abstract class AttackAttributeRule extends AttributeRule {
  abstract getLegalAttacks(attacker: Material, opponentsCards: Material, effectHelper: FactionCardEffectHelper): MaterialMove[]

  getAttackValue(attack: number, _attacker: Material, _opponent: Material): number {
    return attack
  }
}

export const isAttackAttribute = (attribute: Attribute<any>): attribute is Attribute<AttackAttributeRule> => attribute.kind === AttributeKind.Attack
