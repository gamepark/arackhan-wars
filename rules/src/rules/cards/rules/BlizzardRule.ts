import { FactionCardRule } from './base/FactionCardRule'
import { BlizzardEffectRule } from './effect/BlizzardEffectRule'

export class BlizzardRule extends FactionCardRule {

  effect() {
    return new BlizzardEffectRule(this.game, this.item, this.card, this.index)
  }

  skill() {

  }

  weakness() {

  }

  onRoundEnd() {
    return this.discardCard()
  }
}
