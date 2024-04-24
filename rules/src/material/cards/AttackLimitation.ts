import { areAdjacentSquares, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import intersection from 'lodash/intersection'
import { getCardRule } from '../../rules/CardRule'
import { Memory } from '../../rules/Memory'
import { MaterialType } from '../MaterialType'
import { Family } from './Family'

export enum AttackLimitation {
  ByCreatures = 1, ByGroupedCreatures, AdjacentCards, DuringInitiative, BottomRightCards, InGroup, InGroupWeakness, InGroupNotFamily
}

export enum AttackCondition {
  ByCreaturesInGroup = 1, EvenValueCards, CreaturesIfAdjacent, ByCreaturesInGroupOrSpells
}

export abstract class AttackConstraintRule extends MaterialRulesPart {
  preventAttack(_attacker: number, _defender: number): boolean {
    return false
  }

  preventAttackGroup(_attackers: number[], _defender: number): boolean {
    return false
  }

  isInsufficientAttackGroup(_attackers: number[], _defender: number): boolean {
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
  preventAttackGroup(attackers: number[]): boolean {
    return attackers.length > 1
  }
}

export class NoAttackInGroupNotFamily extends NoAttackInGroup {
  constructor(game: MaterialGame, private families: Family[]) {
    super(game)
  }

  preventAttackGroup(attackers: number[]): boolean {
    return attackers.some(attacker => intersection(getCardRule(this.game, attacker).families, this.families).length === 0)
  }
}

export class NoAttackByGroupedCreatures extends NoAttackInGroup {
  preventAttackGroup(attackers: number[]): boolean {
    return attackers.filter(attacker => getCardRule(this.game, attacker).isCreature).length > 1
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
  isInsufficientAttackGroup(attackers: number[]): boolean {
    return attackers.length === 1 && getCardRule(this.game, attackers[0]).isCreature
  }
}

export class AttackByCreaturesOnlyInGroupOrSpells extends AttackByCreaturesOnlyInGroup {
  preventAttackGroup(attackers: number[]): boolean {
    return attackers.some(attacker => getCardRule(this.game, attacker).isSpell)
      && attackers.some(attacker => getCardRule(this.game, attacker).isCreature)
  }
}

export class AttackOnlyEvenValueCards extends AttackConstraintRule {
  preventAttack(_attacker: number, defender: number): boolean {
    return getCardRule(this.game, defender).value % 2 !== 0
  }
}

export class CreaturesIfAdjacent extends AttackConstraintRule {
  preventAttack(attacker: number, defender: number): boolean {
    const attackerRule = getCardRule(this.game, attacker)
    return attackerRule.isCreature && !areAdjacentSquares(attackerRule.item.location, getCardRule(this.game, defender).item.location)
  }
}

