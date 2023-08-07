import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { Memory } from '../../../Memory'
import { getCardRule } from '../../rules/base/CardRule'
import { Attack } from '../../rules/base/AttackRule'

export enum AttackLimitation {
  NoLonelyCreature, NoGroupedCreatures, EvenValueDefender, NoCreature
}

export abstract class AttackLimitationRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
  preventAttack(_attacker: number, _defender: number): boolean {
    return false
  }

  isInvalidAttackGroup(_attackers: number[], _defender: number): boolean {
    return false
  }
}

export class NoLonelyCreatureAttack extends AttackLimitationRule {
  isInvalidAttackGroup(attackers: number[]): boolean {
    return attackers.length === 1 && getCardRule(this.game, attackers[0]).isCreature
  }
}

export class NoGroupedCreaturesAttack extends AttackLimitationRule {
  preventAttack(attacker: number, defender: number): boolean {
    return getCardRule(this.game, attacker).isCreature
      && this.remind<Attack[]>(Memory.Attacks).some(attack =>
        attack.targets.includes(defender) || getCardRule(this.game, attack.card).isCreature
      )
  }

  isInvalidAttackGroup(attackers: number[]): boolean {
    return attackers.filter(attacker => getCardRule(this.game, attacker).isCreature).length > 1
  }
}

export class EvenValueDefenderLimitationRule extends AttackLimitationRule {
  preventAttack(_attacker: number, defender: number): boolean {
    return getCardRule(this.game, defender).characteristics.value % 2 !== 0
  }
}

export class NoCreatureLimitationRule extends AttackLimitationRule {
  preventAttack(attacker: number): boolean {
    return getCardRule(this.game, attacker).isCreature
  }
}

export const AttackLimitationRules: Record<AttackLimitation, new (game: MaterialGame<PlayerId, MaterialType, LocationType>) => AttackLimitationRule> = {
  [AttackLimitation.NoLonelyCreature]: NoLonelyCreatureAttack,
  [AttackLimitation.NoGroupedCreatures]: NoGroupedCreaturesAttack,
  [AttackLimitation.EvenValueDefender]: EvenValueDefenderLimitationRule,
  [AttackLimitation.NoCreature]: NoCreatureLimitationRule
}
