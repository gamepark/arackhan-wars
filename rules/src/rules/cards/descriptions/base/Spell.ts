import { DiscardTiming, FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'
import { Ability } from './Ability'

export abstract class Spell extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Spell
  attack?: number
  astral: boolean = false

  effect?: Ability
  effects: Ability[] = []

  getEffects(): Ability[] {
    return this.effect ? [this.effect] : this.effects
  }

  getPassiveEffects(): Ability[] {
    return this.getEffects()
  }

  canAttack = () => this.attack !== undefined

  get discardTiming() {
    return this.getEffects().length > 0 ? DiscardTiming.EndOfRound : DiscardTiming.ActivationOrEndOfTurn
  }
}

export const isSpell = (detail?: FactionCardCharacteristics): detail is Spell => detail?.kind === FactionCardKind.Spell
