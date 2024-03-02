import { FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Ability } from './Ability'

export abstract class Land extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Land
  legendary = true

  abstract defense: number

  benefit?: Ability
  benefits: Ability[] = []

  getBenefits(): Ability[] {
    return this.benefit ? [this.benefit] : this.benefits
  }

  getAbilities(): Ability[] {
    return this.getBenefits().concat(this.getWeaknesses())
  }
}

export const isLand = (characteristics?: FactionCardCharacteristics): characteristics is Land => characteristics?.kind === FactionCardKind.Land
