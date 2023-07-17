import { AttackRule } from '../base/AttackRule'

export class SwampTrollAttackRule extends AttackRule {

  canBeAttackedBy(attackers: number[]): boolean {
    return attackers.length > 1
  }
}
