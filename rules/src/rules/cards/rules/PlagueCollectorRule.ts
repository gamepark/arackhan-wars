import { FactionCardRule } from './base/FactionCardRule'
import { PlagueCollectorEffectRule } from './effect/PlagueCollectorEffectRule'

export class PlagueCollectorRule extends FactionCardRule {
  effect() {
    return new PlagueCollectorEffectRule(this.game, this.item, this.card, this.index)
  }
}
