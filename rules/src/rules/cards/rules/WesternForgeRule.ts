import { FactionCardRule } from './base/FactionCardRule'
import { WesternForgeEffectRule } from './effect/WesternForgeEffectRule'

export class WesternForgeRule extends FactionCardRule {
  effect() {
    return new WesternForgeEffectRule(this.game, this.item, this.card, this.index)
  }

}
