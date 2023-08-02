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

  getPassiveEffects(): Ability[] {
    return this.getBenefits()
  }
}

export const isLand = (detail?: FactionCardCharacteristics): detail is Land => detail?.kind === FactionCardKind.Land
