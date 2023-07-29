import { DiscardTiming, FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Effect } from './Effect'

export abstract class Spell extends FactionCardCharacteristics {
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

export const isSpell = (detail?: FactionCardCharacteristics): detail is Spell => detail?.kind === FactionCardKind.Spell
