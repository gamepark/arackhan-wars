import { FactionCardDetail, FactionCardKind } from './FactionCardDetail'
import { Effect } from './Effect'

export abstract class Land extends FactionCardDetail {
  kind: FactionCardKind = FactionCardKind.Land
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

export const isLand = (detail: FactionCardDetail): detail is Land => detail.kind === FactionCardKind.Land
