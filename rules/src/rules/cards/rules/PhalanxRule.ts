import { FactionCardRule } from './base/FactionCardRule'
import { PhalanxEffectRule } from './effect/PhalanxEffectRule'

export class PhalanxRule extends FactionCardRule {
  effect() {
    return new PhalanxEffectRule(this.game, this.item, this.card, this.index)
  }
}
