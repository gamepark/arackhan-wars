import { EffectRule } from './Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { isSpell } from './Spell'
import { getCardRule } from '../../rules/base/CardRule'

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
    return !isSpell(getCardRule(game, opponent).characteristics)
  }
}

export const isAttackEffect = (effect: EffectRule): effect is AttackEffect => typeof (effect as any).canBeAttacked === 'function'
