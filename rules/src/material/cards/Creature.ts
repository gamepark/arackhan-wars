import { FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Ability } from './Ability'
import { Family } from './Family'

export abstract class Creature extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Creature

  family?: Family
  abstract attack: number
  abstract defense: number

  skill?: Ability
  skills: Ability[] = []
  weakness?: Ability
  weaknesses: Ability[] = []

  getSkills(): Ability[] {
    return this.skill ? [this.skill] : this.skills
  }

  getWeaknesses(): Ability[] {
    return this.weakness ? [this.weakness] : this.weaknesses
  }

  getAbilities(isSkillDisabled?: boolean): Ability[] {
    if (isSkillDisabled) return this.getWeaknesses()
    return [
      ...this.getSkills(),
      ...this.getWeaknesses()
    ]
  }

  get canAttack() {
    return true
  }
}

export const isCreature = (characteristics?: FactionCardCharacteristics): characteristics is Creature => characteristics?.kind === FactionCardKind.Creature
