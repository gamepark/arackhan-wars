import { EffectRule } from './Ability'
import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { isSpell } from './Spell'
import { getCharacteristics } from '../../../../material/FactionCard'

export class AttackEffect extends EffectRule {
  /**
   * Used in legal moves to know if the player can declare an attack on the opponent
   * Used for the opponent
   */
  canBeAttacked(_attacker: number, _opponent: number, _otherAttackers: number[] = [], _game: MaterialGame): boolean {
    return true
  }

  /**
   *
   * Used in legal moves to know if the player can declare an attack on the opponent
   * Used for the attacker
   */
  canAttack(_attacker: number, opponent: number, _otherAttackers: number[] = [], game: MaterialGame): boolean {
    return !isSpell(getCharacteristics(opponent, game))
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

export const isAttackEffect = (effect: EffectRule): effect is AttackEffect => typeof (effect as any).canBeAttacked === 'function'
