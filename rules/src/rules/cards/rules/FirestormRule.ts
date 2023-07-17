import { FactionCardRule } from './base/FactionCardRule'
import { FirestormEffectRule } from './effect/FirestormEffectRule'

export class FirestormRule extends FactionCardRule {
  effect() {
    return new FirestormEffectRule(this.game, this.item, this.card, this.index)
  }

  onRoundEnd() {
    return this.discardCard()
  }
}
