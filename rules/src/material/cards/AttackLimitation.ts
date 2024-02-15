import { areAdjacentSquares, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Attack } from '../../rules/AttackRule'
import { getCardRule } from '../../rules/CardRule'
import { Memory } from '../../rules/Memory'
import { AttackerConstraint, DefenderConstraint, EffectType } from './Effect'

export enum AttackLimitation {
  ByCreatures = 1, ByGroupedCreatures, AdjacentCards
}

export enum AttackCondition {
  ByCreaturesInGroup = 1, EvenValueCards
}

export abstract class AttackConstraintRule extends MaterialRulesPart {
  abstract preventAttack(attacker: number, defender: number): boolean

  isInvalidAttackGroup(_attackers: number[], _defender: number): boolean {
    return false
  }
}

export class NoAttack extends AttackConstraintRule {
  preventAttack(): boolean {
    return true
  }
}

export class NoAttackByCreatures extends AttackConstraintRule {
  preventAttack(attacker: number): boolean {
    return getCardRule(this.game, attacker).isCreature
  }
}

export class NoAttackByGroupedCreatures extends AttackConstraintRule {
  preventAttack(attacker: number, defender: number): boolean {
    return getCardRule(this.game, attacker).isCreature
      && this.remind<Attack[]>(Memory.Attacks).some(attack =>
        attack.targets.includes(defender) && getCardRule(this.game, attack.card).isCreature
      )
  }
}

export class NoAttackOnAdjacentCard extends AttackConstraintRule {
  preventAttack(attacker: number, defender: number): boolean {
    return areAdjacentSquares(getCardRule(this.game, attacker).item.location, getCardRule(this.game, defender).item.location)
  }
}

export class AttackByCreaturesOnlyInGroup extends AttackConstraintRule {
  preventAttack(): boolean {
    return false
  }

  isInvalidAttackGroup(attackers: number[]): boolean {
    return attackers.length === 1 && getCardRule(this.game, attackers[0]).isCreature
  }
}

export class AttackOnlyEvenValueCards extends AttackConstraintRule {
  preventAttack(_attacker: number, defender: number): boolean {
    const characteristics = getCardRule(this.game, defender).characteristics
    return characteristics !== undefined && characteristics.value % 2 !== 0
  }
}

export const getAttackConstraint = (effect: AttackerConstraint | DefenderConstraint, game: MaterialGame) => {
  switch (effect.type) {
    case EffectType.CannotAttack:
    case EffectType.CannotBeAttacked:
      switch (effect.limitation) {
        case AttackLimitation.ByCreatures:
          return new NoAttackByCreatures(game)
        case AttackLimitation.ByGroupedCreatures:
          return new NoAttackByGroupedCreatures(game)
        case AttackLimitation.AdjacentCards:
          return new NoAttackOnAdjacentCard(game)
        default:
          return new NoAttack(game)
      }
    case EffectType.CanOnlyAttack:
    case EffectType.CanOnlyBeAttacked:
      switch (effect.condition) {
        case AttackCondition.ByCreaturesInGroup:
          return new AttackByCreaturesOnlyInGroup(game)
        case AttackCondition.EvenValueCards:
          return new AttackOnlyEvenValueCards(game)
      }
  }
}
