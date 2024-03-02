import { Ability } from './Ability'
import { FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Family } from './Family'

export abstract class Creature extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Creature

  family?: Family
  abstract attack: number
  abstract defense: number

  skill?: Ability
  skills: Ability[] = []

  getSkills(): Ability[] {
    return this.skill ? [this.skill] : this.skills
  }

  getAbilities(): Ability[] {
    return this.getSkills().concat(this.getWeaknesses())
  }

  get canAttack() {
    return true
  }
}

export const isCreature = (characteristics?: FactionCardCharacteristics): characteristics is Creature => characteristics?.kind === FactionCardKind.Creature
