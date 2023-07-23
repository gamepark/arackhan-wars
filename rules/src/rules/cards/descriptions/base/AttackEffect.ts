import { PassiveEffect } from './Effect'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { isSpell } from './Spell'
import { getFactionCardDescription } from '../../../../material/FactionCard'

export class AttackEffect extends PassiveEffect {
  /**
   * Used in legal moves to know if the player can declare an attack on the opponent
   * Used for the opponent
   */
  canBeAttacked(_attacker: number, _opponent: number, _otherAttackers: number[] = []): boolean {
    return true
  }

  /**
   *
   * Used in legal moves to know if the player can declare an attack on the opponent
   * Used for the attacker
   */
  canAttack(_attacker: number, opponent: number, _otherAttackers: number[] = []): boolean {
    const card = this.material(MaterialType.FactionCard).getItem(opponent)!
    return !isSpell(getFactionCardDescription(card.id.front))

  }

  /**
   * Only for carnivorous plant. Used in attack resolution (if not valid => attack = 0)
   */
  isValidAttack(_attackers: number[]): boolean {
    return true
  }

  getAttackValue(_attackers: number[]): number {
    return 0
  }

  getAttackConsequences(_attacker: Material): MaterialMove[] {
    return []
  }
}

export const isAttackEffect = (effect: PassiveEffect): effect is AttackEffect => typeof (effect as any).canBeAttacked === 'function'
