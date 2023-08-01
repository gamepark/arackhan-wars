import { FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Effect } from './Effect'

export abstract class Land extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Land
  legendary = true

  abstract defense: number

  benefit?: Effect
  benefits: Effect[] = []

  getBenefits(): Effect[] {
    return this.benefit ? [this.benefit] : this.benefits
  }

  getPassiveEffects(): Effect[] {
    return this.getBenefits()
  }
}

export const isLand = (detail?: FactionCardCharacteristics): detail is Land => detail?.kind === FactionCardKind.Land
