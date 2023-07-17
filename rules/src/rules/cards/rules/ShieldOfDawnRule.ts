import { FactionCardRule } from './base/FactionCardRule'
import { ShieldOfDawnEffectRule } from './effect/ShieldOfDawnEffectRule'

export class ShieldOfDawnRule extends FactionCardRule {

  effect() {
    return new ShieldOfDawnEffectRule(this.game, this.item, this.card, this.index)
  }
}
