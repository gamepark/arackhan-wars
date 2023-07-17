import { AttackRule } from '../base/AttackRule'

export class CarnivorousPlantAttackRule extends AttackRule {

  canBeAttackedBy(attackers: number[]): boolean {
    return attackers.length > 1
  }
}
