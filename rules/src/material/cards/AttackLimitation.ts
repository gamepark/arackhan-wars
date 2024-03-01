import { areAdjacentSquares, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Attack } from '../../rules/AttackRule'
import { getCardRule } from '../../rules/CardRule'
import { Memory } from '../../rules/Memory'
import { MaterialType } from '../MaterialType'
import { AttackerConstraint, DefenderConstraint, EffectType } from './Effect'

export enum AttackLimitation {
  ByCreatures = 1, ByGroupedCreatures, AdjacentCards, DuringInitiative, BottomRightCards, InGroup
}

export enum AttackCondition {
  ByCreaturesInGroup = 1, EvenValueCards
}

export abstract class AttackConstraintRule extends MaterialRulesPart {
  preventAttack(_attacker: number, _defender: number): boolean {
    return false
  }

  preventAttackerToJoinGroup(_newAttacker: number): boolean {
    return false
  }

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

export class NoAttackInGroup extends AttackConstraintRule {
  preventGroupAttackWith(_otherAttacker: number): boolean {
    return true
  }

  preventAttackerToJoinGroup(_newAttacker: number): boolean {
    return true
  }

  preventAttack(attacker: number, defender: number): boolean {
    return getCardRule(this.game, attacker).isCreature && this.remind<Attack[]>(Memory.Attacks).some(attack =>
      attack.targets.includes(defender) && this.preventGroupAttackWith(attack.card)
    )
  }
}

export class NoAttackByGroupedCreatures extends NoAttackInGroup {
  preventGroupAttackWith(otherAttacker: number): boolean {
    return getCardRule(this.game, otherAttacker).isCreature
  }

  preventAttackerToJoinGroup(newAttacker: number): boolean {
    return this.preventGroupAttackWith(newAttacker)
  }
}

export class NoAttackOnAdjacentCard extends AttackConstraintRule {
  preventAttack(attacker: number, defender: number): boolean {
    return areAdjacentSquares(getCardRule(this.game, attacker).item.location, getCardRule(this.game, defender).item.location)
  }
}

export class NoAttackDuringInitiative extends AttackConstraintRule {
  preventAttack(): boolean {
    return this.remind(Memory.IsInitiativeSequence)
  }
}

export class NoAttackBottomRightCards extends AttackConstraintRule {
  preventAttack(attacker: number, defender: number): boolean {
    const attackerLocation = this.material(MaterialType.FactionCard).index(attacker).getItem()!.location
    const defenderLocation = this.material(MaterialType.FactionCard).index(defender).getItem()!.location
    if (attackerLocation.player === 1) {
      return attackerLocation.x! - 1 === defenderLocation.x || attackerLocation.y! - 1 === defenderLocation.y
    } else {
      return attackerLocation.x! + 1 === defenderLocation.x || attackerLocation.y! + 1 === defenderLocation.y
    }
  }
}

export class AttackByCreaturesOnlyInGroup extends AttackConstraintRule {
  isInvalidAttackGroup(attackers: number[]): boolean {
    return attackers.length === 1 && getCardRule(this.game, attackers[0]).isCreature
  }
}

export class AttackOnlyEvenValueCards extends AttackConstraintRule {
  preventAttack(_attacker: number, defender: number): boolean {
    return getCardRule(this.game, defender).value % 2 !== 0
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
        case AttackLimitation.DuringInitiative:
          return new NoAttackDuringInitiative(game)
        case AttackLimitation.BottomRightCards:
          return new NoAttackBottomRightCards(game)
        case AttackLimitation.InGroup:
          return new NoAttackInGroup(game)
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
