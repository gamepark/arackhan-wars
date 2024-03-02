import { Ability } from './Ability'
import { DiscardTiming, FactionCardCharacteristics, FactionCardKind } from './FactionCardCharacteristics'

export abstract class Spell extends FactionCardCharacteristics {
  kind: FactionCardKind = FactionCardKind.Spell
  attack?: number
  astral: boolean = false

  effect?: Ability
  effects: Ability[] = []

  getEffects(): Ability[] {
    return this.effect ? [this.effect] : this.effects
  }

  getAbilities(): Ability[] {
    return this.getEffects().concat(this.getWeaknesses())
  }

  get canAttack() {
    return this.attack !== undefined
  }

  get discardTiming() {
    return this.getEffects().length > 0 ? DiscardTiming.EndOfRound : DiscardTiming.ActivationOrEndOfTurn
  }
}

export const isSpell = (characteristics?: FactionCardCharacteristics): characteristics is Spell => characteristics?.kind === FactionCardKind.Spell
