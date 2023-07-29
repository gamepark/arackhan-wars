import { FactionCardDetail, FactionCardKind } from './FactionCardDetail'
import { Effect } from './Effect'
import { Family } from './Family'

export abstract class Creature extends FactionCardDetail {
  kind: FactionCardKind = FactionCardKind.Creature

  family?: Family
  abstract attack: number
  abstract defense: number

  skill?: Effect
  skills: Effect[] = []
  weakness?: Effect
  weaknesses: Effect[] = []

  getSkills(): Effect[] {
    return this.skill ? [this.skill] : this.skills
  }

  getWeaknesses(): Effect[] {
    return this.weakness ? [this.weakness] : this.weaknesses
  }

  getPassiveEffects(isSkillDisabled?: boolean): Effect[] {
    if (isSkillDisabled) return this.getWeaknesses()
    return [
      ...this.getSkills(),
      ...this.getWeaknesses()
    ]
  }

  canAttack = () => true
}

export const isCreature = (detail: FactionCardDetail): detail is Creature => detail.kind === FactionCardKind.Creature
