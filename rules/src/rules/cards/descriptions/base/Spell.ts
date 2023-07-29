import { DiscardTiming, FactionCardDetail, FactionCardKind } from './FactionCardDetail'
import { Effect } from './Effect'

export abstract class Spell extends FactionCardDetail {
  kind: FactionCardKind = FactionCardKind.Spell
  attack?: number
  astral: boolean = false

  effect?: Effect
  effects: Effect[] = []

  getEffects(): Effect[] {
    return this.effect ? [this.effect] : this.effects
  }

  getPassiveEffects(): Effect[] {
    return this.getEffects()
  }

  canAttack = () => this.attack !== undefined

  get discardTiming() {
    return this.getEffects().length > 0 ? DiscardTiming.EndOfRound : DiscardTiming.ActivationOrEndOfTurn
  }
}

export const isSpell = (detail: FactionCardDetail): detail is Spell => detail.kind === FactionCardKind.Spell
