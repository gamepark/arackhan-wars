import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { Memory } from '../../../Memory'
import { ActivatedCard } from '../../../types'
import { getCardRule } from '../../rules/base/CardRule'

export enum AttackLimitation {
  NoLonelyCreature, NoGroupedCreatures, EvenValueDefender, NoCreature
}

export abstract class AttackLimitationRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
  preventAttack(_attacker: number, _defender: number): boolean {
    return false
  }

  isAttackValid(_defender: number): boolean {
    return true
  }
}

export class NoLonelyCreatureAttack extends AttackLimitationRule {
  isAttackValid(defender: number): boolean {
    const attackers = this.remind<ActivatedCard[]>(Memory.ActivatedCards)
      .filter(activatedCard => activatedCard.targets?.includes(defender))
      .map(activatedCard => activatedCard.card)
    return attackers.length > 1 || !getCardRule(this.game, attackers[0]).isCreature
  }
}

export class NoGroupedCreaturesAttack extends AttackLimitationRule {
  preventAttack(attacker: number, defender: number): boolean {
    return getCardRule(this.game, attacker).isCreature
      && this.remind<ActivatedCard[]>(Memory.ActivatedCards).some(activatedCard =>
        activatedCard.targets?.includes(defender) || getCardRule(this.game, activatedCard.card).isCreature
      )
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
