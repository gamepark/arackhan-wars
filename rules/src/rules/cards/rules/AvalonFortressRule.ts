import { FactionCardRule } from './base/FactionCardRule'
import { AvalonFortressEffectRule } from './effect/AvalonFortressEffectRule'

export class AvalonFortressRule extends FactionCardRule {
  effect() {
    return new AvalonFortressEffectRule(this.game, this.item, this.card, this.index)
  }
}
